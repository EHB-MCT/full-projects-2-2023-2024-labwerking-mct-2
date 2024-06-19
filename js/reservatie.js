document.addEventListener("DOMContentLoaded", function () {
	// Initialiseer de kalenderelement en formulieren
	const calendarEl = document.getElementById("calendar");
	const form = document.querySelector("#fase-1");
	const submit1 = document.querySelector("#submit1");
	const fase2 = document.querySelector("#fase-2");
	let selectedLab = "";
	let existingReservations = [];

	// Haal de lab inputvelden op
	const labInputs = document.querySelectorAll('input[name="lab"]');

	// Voeg een event listener toe aan de lab inputvelden
	labInputs.forEach(function (input) {
		input.addEventListener("change", function () {
			selectedLab = this.value; // Update de geselecteerde lab
			calendar.refetchEvents(); // Vernieuw de kalender om de reserveringen voor de geselecteerde lab te tonen
		});
	});

	// Initialiseer de kalender
	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "timeGridWeek", // Standaard weergave van de kalender
		slotMinTime: "09:00:00", // Minimum tijdslot
		slotMaxTime: "18:00:00", // Maximum tijdslot
		slotDuration: "01:00:00", // Duur van elk tijdslot
		slotLabelFormat: {
			// Formaat van de tijdlabels
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		},
		eventTimeFormat: {
			// Formaat van de tijd van evenementen
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		},
		slotLabelInterval: { hours: 1 }, // Interval tussen tijdlabels
		headerToolbar: {
			// Configuratie van de kalenderheader
			left: "prev,next today",
			center: "",
			right: "title",
		},
		allDaySlot: false, // Geen hele dag tijdslot
		weekends: { start: 1, end: 5 }, // Weekdagen van maandag tot vrijdag
		themeSystem: {
			// Thema instellingen voor knoppen
			prevButton: {
				backgroundColor: "#f9a084",
				borderColor: "#f9a084",
				color: "#ffffff",
			},
			nextButton: {
				backgroundColor: "#f9a084",
				borderColor: "#f9a084",
				color: "#ffffff",
			},
			todayButton: {
				backgroundColor: "#95d0d3",
				borderColor: "#95d0d3",
				color: "#ffffff",
			},
		},
		firstDay: 1, // Eerste dag van de week is maandag
		events: function (info, successCallback, failureCallback) {
			// Ophalen van evenementen
			fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records")
				.then(function (response) {
					response.json();
				})
				.then(function (data) {
					const events = data.items
						.filter(function (item) {
							return item.Locatie === selectedLab; // Filter evenementen op geselecteerde lab
						})
						.map(function (item) {
							const start = new Date(item.Begindatum);
							const end = new Date(item.Einddatum);
							start.setHours(start.getHours() - 2);
							end.setHours(end.getHours() - 2);
							return {
								title: "Reserved", // Titel van het evenement
								start: start, // Starttijd van het evenement
								end: end, // Eindtijd van het evenement
								rendering: "background", // Weergave als achtergrond
							};
						});

					successCallback(events); // Roep de callback functie aan met de gefilterde evenementen
				})
				.catch(function (error) {
					console.error("Error:", error);
					failureCallback(error); // Roep de callback functie aan met de foutmelding
				});
		},
		select: function (info) {
			// Selecteer een tijdslot
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

					const data = {
						Locatie: selectedLab, // Geselecteerde lab
						Beschrijving: "Project description", // Beschrijving van het project
						Naam: nameV, // Naam van de gebruiker
						Email: emailV, // E-mail van de gebruiker
						Tel: phoneV, // Telefoonnummer van de gebruiker
						Begindatum: start, // Begin tijd van de reservering
						Einddatum: end, // Eind tijd van de reservering
					};

					fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data), // Stuur de data naar de server
					})
						.then(function (response) {
							response.json();
						})
						.then(function (data) {
							console.log(data);

							alert("Uw reservatie is verstuurd");
							window.location.href = "index.html"; // Herlaad de pagina
						})
						.catch(function (error) {
							console.error("Error:", error);
						});
				});
			}
		},
		eventRender: function (info) {
			// Render evenement in de kalender
			if (info.event.extendedProps.lab === selectedLab) {
				info.el.style.backgroundColor = getColorForLab(selectedLab); // Geef de achtergrondkleur op basis van de lab
			}
		},
	});

	calendar.render(); // Render de kalender

	submit1.addEventListener("click", function (event) {
		event.preventDefault();
		event.stopPropagation();

		const lab = document.querySelector('input[name="lab"]:checked');
		if (!lab) {
			alert("Selecteer een lab om verder te gaan.");
			return;
		}

		const description = document.querySelector("#contact-textarea").value;

		const descriptionRegex = /^[a-zA-Z ]+$/;
		if (!descriptionRegex.test(description)) {
			alert("Vul een bericht in.");
			return;
		}

		if (lab && description) {
			form.classList.remove("display");
			form.classList.add("none");
			fase2.classList.remove("none");
			fase2.classList.add("display");
			// Verander de weergave van de indicatoren voor fase 1 en fase 2
			document.querySelector(".fase-1-indicator").classList.remove("color3-bg");
			document.querySelector(".fase-1-indicator").classList.add("color4-bg");
			document.querySelector(".fase-1-indicator").classList.add("color3");
			document.querySelector(".fase-1-indicator").classList.remove("color4");
			document.querySelector(".fase-2-indicator").classList.remove("color4-bg");
			document.querySelector(".fase-2-indicator").classList.add("color3-bg");
			document.querySelector(".fase-2-indicator").classList.add("color4");
			document.querySelector(".fase-2-indicator").classList.remove("color3");
			calendar.render(); // Vernieuw de kalender

			fetch("https://labbxl.pockethost.io/api/collections/Reservatie/records")
				.then(function (response) {
					response.json();
				})
				.then(function (data) {
					existingReservations = data.items.map(function (item) {
						return {
							start: new Date(item.Begindatum),
							end: new Date(item.Einddatum),
							lab: item.Locatie,
						};
					});
				})
				.catch(function (error) {
					console.error("Error:", error);
				});

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

				const nameRegex = /^[a-zA-Z ]+$/;
				if (!nameRegex.test(nameV)) {
					alert("Vul een geldige naam in (alleen letters en spaties toegestaan).");
					return;
				}

				const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				if (!emailRegex.test(emailV)) {
					alert("Vul een geldig e-mailadres in.");
					return;
				}

				const phoneRegex = /^\d{10}$/;
				if (!phoneRegex.test(phoneV)) {
					alert("Vul een geldig telefoonnummer in (10 cijfers).");
					return;
				}

				const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
				if (!dateRegex.test(dateV)) {
					alert("Vul een geldige datum in (DD-MM-JJJJ).");
					return;
				}

				const timeRegex = /^(0[0-9]|1[0-7]):[0-5][0-9]$/;
				if (!timeRegex.test(time1V) || !timeRegex.test(time2V)) {
					alert("Vul een geldige tijd in (09:00-17:00).");
					return;
				}

				const isLabReserved = existingReservations.some(function (reservation) {
					return reservation.lab === selectedLab && ((new Date(datetime1) >= reservation.start && new Date(datetime1) < reservation.end) || (new Date(datetime2) >= reservation.start && new Date(datetime2) <= reservation.end));
				});

				if (isLabReserved) {
					alert("De geselecteerde lab is al gereserveerd op dit tijdstip. Kies een ander tijdstip of lab.");
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
});

// Functie om de kleur voor een lab op te halen
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
