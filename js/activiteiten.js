document.addEventListener("DOMContentLoaded", function () {
	let acc = document.getElementsByClassName("accordion");

	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			let panel = this.nextElementSibling;
			let arrow = this.querySelector(".arrow");

			if (panel.style.display === "block") {
				panel.style.display = "none";
				arrow.style.transform = "rotate(0deg)";
			} else {
				panel.style.display = "block";
				arrow.style.transform = "rotate(180deg)";
			}
		});
	}
});
