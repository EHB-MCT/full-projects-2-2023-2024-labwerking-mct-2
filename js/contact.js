document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contact-form");
	const submitBtn = document.getElementById("submit-btn");
	const confirmationMessage = document.getElementById("confirmation-message");

	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const description = document.getElementById("description").value;

		if (name && email && description) {
			// Send the form data to the PHP script
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "send-email.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(`name=${name}&email=${email}&description=${description}`);

			xhr.onload = function () {
				if (xhr.status === 200) {
					confirmationMessage.style.display = "block";
					form.reset();
				} else {
					console.error("Error sending email:", xhr.statusText);
				}
			};
		} else {
			alert("Please fill in all the fields");
		}
	});
});
