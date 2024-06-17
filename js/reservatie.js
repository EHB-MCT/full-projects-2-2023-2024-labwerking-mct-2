document.addEventListener("DOMContentLoaded", function () {
	const calendarEl = document.getElementById("calendar");
	const form = document.querySelector("#form");
	const submit1 = document.querySelector("#submit1");
	const fase2 = document.querySelector("#fase-2");

	// Initialize the calendar
	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "timeGridWeek",
		slotMinTime: "07:00:00",
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
			center: "title",
			right: "timeGridWeek",
		},
		allDaySlot: false,
		weekends: { start: 1, end: 5 },
		events: function (info, successCallback, failureCallback) {
			fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records")
				.then((response) => response.json())
				.then((data) => {
					const events = data.items.map((item) => {
						return {
							title: "Reserved",
							start: item.Begindatum,
							end: item.Einddatum,
							rendering: "background",
							color: "red",
						};
					});
					successCallback(events);
				})
				.catch((error) => {
					console.error("Error:", error);
					failureCallback(error);
				});
		},
		selectable: true,
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

					// Validate phone number
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
						Locatie: "Medialab",
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
						.then((response) => response.json())
						.then((data) => {
							console.log(data);

							alert("Uw reservatie is verstuurd");
							window.location.href = "index.html";
						})
						.catch((error) => {
							console.error("Error:", error);
						});
				});
			}
		},
	});

	calendar.render();

	submit1.addEventListener("click", function (event) {
		event.preventDefault();
		event.stopPropagation();

		const lab = document.querySelector('input[name="lab"]').value;
		const description = document.querySelector("#contact-textarea").value;

		if (lab && description) {
			form.classList.remove("display");
			form.classList.add("none");
			fase2.classList.remove("none");
			fase2.classList.add("display");
			calendar.render();

			// Fetch existing reservations from API
			let existingReservations = [];
			fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records")
				.then((response) => response.json())
				.then((data) => {
					data.items.forEach((item) => {
						existingReservations.push({
							start: new Date(item.Begindatum),
							end: new Date(item.Einddatum),
							lab: item.Locatie,
						});
					});
				})
				.catch((error) => {
					console.error("Error:", error);
				});

			function isLabReserved(start, end, lab) {
				return existingReservations.some((reservation) => {
					return (reservation.lab === lab && new Date(start) >= reservation.start && new Date(start) <= reservation.end) || (new Date(end) >= reservation.start && new Date(end) <= reservation.end);
				});
			}

			// Add event listener to submit2 button
			const submit2 = document.querySelector("#submit2");
			submit2.addEventListener("click", function (event) {
				event.preventDefault();

				const nameV = document.querySelector('input[name="name"]').value;
				const phoneV = document.querySelector('input[name="phone"]').value;
				const emailV = document.querySelector('input[name="email"]').value;
				const dateV = document.querySelector('input[name="date"]').value;
				const time1V = document.querySelector('input[name="time1"]').value;
				const time2V = document.querySelector('input[name="time2"]').value;
				const datetime1 = dateV + " " + time1V + ":00.000";
				const datetime2 = dateV + " " + time2V + ":00.000";

				// Validate phone number
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
				// Validate time
				const timeRegex = /^(0[0-9]|1[0-7]):[0-5][0-9]$/;
				if (!timeRegex.test(time1V) || !timeRegex.test(time2V)) {
					alert("Please enter a valid time (09:00-17:00).");
					return;
				}
				// Check if the selected lab is already reserved at a same time
				const isLabReserved = existingReservations.some((reservation) => {
					return (reservation.lab === lab && new Date(datetime1) >= reservation.start && new Date(datetime1) <= reservation.end) || (new Date(datetime2) >= reservation.start && new Date(datetime2) <= reservation.end);
				});

				if (isLabReserved) {
					alert("The selected lab is already reserved at this time. Please select a different time or lab.");
					return;
				}

				// Create an object to store the data
				const data = {
					Locatie: lab,
					Beschrijving: description,
					Naam: nameV,
					Email: emailV,
					Tel: phoneV,
					Begindatum: datetime1,
					Einddatum: datetime2,
				};

				// Send data to API
				fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);

						alert("Uw reservatie is verstuurd");
						window.location.href = "index.html";
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			});
		}
	});
});
