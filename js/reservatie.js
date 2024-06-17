document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector("#form");
	const submit1 = document.querySelector("#submit1");
	const fase2 = document.querySelector("#fase-2");

	submit1.addEventListener("click", function (event) {
		event.preventDefault();

		const lab = document.querySelector('input[name="lab"]:checked');
		const description = document.querySelector("#contact-textarea").value;

		if (lab && description) {
			form.classList.remove("display");
			form.classList.add("none");
			fase2.classList.remove("none");
			fase2.classList.add("display");

			// Add event listener to submit2 button
			const submit2 = document.querySelector("#submit2");
			submit2.addEventListener("click", function (event) {
				event.preventDefault();

				const nameV = document.querySelector('input[name="name"]').value;

				const dateV = document.querySelector('input[name="date"]').value;
				const timeV = document.querySelector('input[name="time"]').value;
				const datetime = dateV + " " + timeV + ":00.000";

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
					Locatie: lab.value,
					Beschrijving: description,
					Naam: nameV,
					Email: emailV,
					Tel: phoneV,
					Datum: datetime,
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
		} else {
			alert("Please fill in all required fields");
		}
	});
});
