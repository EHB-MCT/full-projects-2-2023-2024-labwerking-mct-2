document.addEventListener("DOMContentLoaded", function () {
	const calendarEl = document.getElementById("calendar");
	const form = document.querySelector("#fase-1");
	const submit1 = document.querySelector("#submit1");
	const fase2 = document.querySelector("#fase-2");
	let selectedLab = "";
	let existingReservations = [];

	// Get the lab input fields
	const labInputs = document.querySelectorAll('input[name="lab"]');

	// Add event listener to lab input fields
	labInputs.forEach(function (input) {
		input.addEventListener("change", function () {
			selectedLab = this.value;
			calendar.refetchEvents();
		});
	});

	// Initialize the calendar
	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "timeGridWeek",
		slotMinTime: "09:00:00",
		slotMaxTime: "18:00:00",
		slotDuration: "01:00:00",
		slotLabelFormat: {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		},
		eventTimeFormat: {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		},
		slotLabelInterval: { hours: 1 },
		headerToolbar: {
			left: "prev,next today",
			center: "",
			right: "title",
		},
		allDaySlot: false,
		weekends: { start: 1, end: 5 },
		themeSystem: {
			prevButton: {
				// added colon and comma
				backgroundColor: "#f9a084",
				borderColor: "#f9a084",
				color: "#ffffff",
			},
			nextButton: {
				// added colon and comma
				backgroundColor: "#f9a084",
				borderColor: "#f9a084",
				color: "#ffffff",
			},
			todayButton: {
				// added colon and comma
				backgroundColor: "#95d0d3",
				borderColor: "#95d0d3",
				color: "#ffffff",
			},
		},
		firstDay: 1,
		events: function (info, successCallback, failureCallback) {
			fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records")
				.then(function (response) {
					response.json();
				})
				.then(function (data) {
					const events = data.items
						.filter(function (item) {
							item.Locatie === selectedLab;
						}) // Filter events based on the selected lab
						.map(function (item) {
							const start = new Date(item.Begindatum);
							const end = new Date(item.Einddatum);
							start.setHours(start.getHours() - 2);
							end.setHours(end.getHours() - 2);
							return {
								title: "Reserved",
								start: start,
								end: end,
								rendering: "background",
							};
						});

					successCallback(events);
				})
				.catch(function (error) {
					console.error("Error:", error);
					failureCallback(error);
				});
		},
		select: function (info) {
			const start = moment(info.startStr).subtract(2, "hours").format();
			const end = moment(info.endStr).subtract(2, "hours").format();

			if (start < end) {
				form.classList.remove("none");
				form.classList.add("display");

				submit1.addEventListener("click", function (event) {
					event.preventDefault();

					const nameV = document.querySelector('input[name="name"]').value;
					const phoneV = document.querySelector('input[name="phone"]').value;
					const emailV = document.querySelector('input[name="email"]').value;

					const phoneRegex = /^\d{10}$/;
					if (!phoneRegex.test(phoneV)) {
						alert("Please enter a valid phone number (10 digits).");
						return;
					}
					// Validate email
					const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
					if (!emailRegex.test(emailV)) {
						alert("Please enter a valid email address.");
						return;
					}

					// Create an object to store the data
					const data = {
						Locatie: selectedLab,
						Beschrijving: "Project description",
						Naam: nameV,
						Email: emailV,
						Tel: phoneV,
						Begindatum: start,
						Einddatum: end,
					};

					// Send data to API
					fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					})
						.then(function (response) {
							response.json();
						})
						.then(function (data) {
							console.log(data);

							alert("Uw reservatie is verstuurd");
							window.location.href = "index.html";
						})
						.catch(function (error) {
							console.error("Error:", error);
						});
				});
			}
		},
		eventRender: function (info) {
			if (info.event.extendedProps.lab === selectedLab) {
				info.el.style.backgroundColor = getColorForLab(selectedLab);
			}
		},
	});

	calendar.render();

	submit1.addEventListener("click", function (event) {
		event.preventDefault();
		event.stopPropagation();

		document.querySelector(".fase-1-indicator").classList.remove("color3-bg");
		document.querySelector(".fase-1-indicator").classList.add("color4-bg");
		document.querySelector(".fase-1-indicator").classList.add("color3");
		document.querySelector(".fase-1-indicator").classList.remove("color4");
		document.querySelector(".fase-2-indicator").classList.remove("color4-bg");
		document.querySelector(".fase-2-indicator").classList.add("color3-bg");
		document.querySelector(".fase-2-indicator").classList.add("color4");
		document.querySelector(".fase-2-indicator").classList.remove("color3");

		const lab = document.querySelector('input[name="lab"]').value;
		const description = document.querySelector("#contact-textarea").value;

		if (lab && description) {
			form.classList.remove("display");
			form.classList.add("none");
			fase2.classList.remove("none");
			fase2.classList.add("display");
			calendar.render();

			// Fetch existing reservations from API
			fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records")
				.then(function (response) {
					response.json();
				})
				.then(function (data) {
					existingReservations = data.items.map(function(item) ({
						start: new Date(item.Begindatum),
						end: new Date(item.Einddatum),
						lab: item.Locatie,
					}));
				})
				.catch(function (error) {
					console.error("Error:", error);
				});

			// Add event listener to submit2 button
			const submit2 = document.querySelector("#submit2");
			submit2.addEventListener("click", function (event) {
				event.preventDefault();

				// Show the loading circle

				const nameV = document.querySelector('input[name="name"]').value;
				const phoneV = document.querySelector('input[name="phone"]').value;
				const emailV = document.querySelector('input[name="email"]').value;
				const dateV = document.querySelector('input[name="date"]').value;
				const time1V = document.querySelector('input[name="time1"]').value;
				const time2V = document.querySelector('input[name="time2"]').value;
				const datetime1 = dateV + " " + time1V + ":00.000";
				const datetime2 = dateV + " " + time2V + ":00.000";
				// Validate name
				const nameRegex = /^[a-zA-Z ]+$/;
				if (!nameRegex.test(nameV)) {
					alert("Please enter a valid name (only letters and spaces allowed).");
					return;
				}

				// Validate email
				const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				if (!emailRegex.test(emailV)) {
					alert("Please enter a valid email address.");
					return;
				}

				// Validate phone
				const phoneRegex = /^\d{10}$/;
				if (!phoneRegex.test(phoneV)) {
					alert("Please enter a valid phone number (10 digits).");
					return;
				}

				// Validate date
				const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
				if (!dateRegex.test(dateV)) {
					alert("Please enter a valid date (DD-MM-YYYY).");
					return;
				}

				// Validate time
				const timeRegex = /^(0[0-9]|1[0-7]):[0-5][0-9]$/;
				if (!timeRegex.test(time1V) || !timeRegex.test(time2V)) {
					alert("Please enter a valid time (09:00-17:00).");
					return;
				}

				// Check if the selected lab is already reserved at the same time
				const isLabReserved = existingReservations.some(function(reservation) {
					return reservation.lab === selectedLab && ((new Date(datetime1) >= reservation.start && new Date(datetime1) < reservation.end) || (new Date(datetime2) >= reservation.start && new Date(datetime2) <= reservation.end));
				});

				if (isLabReserved) {
					alert("The selected lab is already reserved at this time. Please select a different time or lab.");
					return;
				}

				const reservationData = {
					Locatie: selectedLab,
					Beschrijving: description,
					Naam: nameV,
					Email: emailV,
					Tel: phoneV,
					Begindatum: datetime1,
					Einddatum: datetime2,
				};
				document.getElementById("loading-circle").classList.add("display");
				document.getElementById("loading-circle").classList.remove("none");

				// Send data to API
				fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(reservationData),
				})
					.then(function (response) {
						response.json();
					})
					.then(function (data) {
						document.getElementById("loading-circle").classList.add("none");
						document.getElementById("loading-circle").classList.remove("display");
						alert("Uw reservatie is verstuurd");
						window.location.href = "index.html";
					})
					.catch(function (error) {
						console.error("Error:", error);
					});
			});
		}
	});
	document.querySelector("#submit1").addEventListener("click", function (event) {
		event.preventDefault();

		// Toggle classes for fase-1 and fase-2
		document.querySelector("#fase-1").classList.remove("display");
		document.querySelector("#fase-1").classList.add("none");
		document.querySelector("#fase-2").classList.remove("none");
		document.querySelector("#fase-2").classList.add("display");

		// Update classes for fase-1-indicator and fase-2-indicator
		document.querySelector(".fase-1-indicator").classList.remove("color3-bg");
		document.querySelector(".fase-1-indicator").classList.add("color4-bg");
		document.querySelector(".fase-2-indicator").classList.remove("color4-bg");
		document.querySelector(".fase-2-indicator").classList.add("color3-bg");
	});
});

// Function to get the color for a lab
function getColorForLab(lab) {
	switch (lab) {
		case "medialab":
			return "red";
		case "fablab":
			return "blue";
		case "contentlab":
			return "green";
		default:
			return "";
	}
}
