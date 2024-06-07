let dropdown = false;
document.addEventListener("DOMContentLoaded", function () {
	console.log("hello world");
	document.querySelector(".navigation-item.dropdown").addEventListener("click", function () {
		if (dropdown == false) {
			document.querySelector(".dropdown-menu").classList.add("display");
			document.querySelector(".dropdown-menu").classList.remove("none");
			document.querySelector(".nav-arrow-down").classList.add("none");
			document.querySelector(".nav-arrow-down").classList.remove("display");
			document.querySelector(".nav-arrow-up").classList.add("display");
			document.querySelector(".nav-arrow-up").classList.remove("none");

			dropdown = true;
		} else if (dropdown == true) {
			document.querySelector(".dropdown-menu").classList.add("none");
			document.querySelector(".dropdown-menu").classList.remove("display");
			document.querySelector(".nav-arrow-down").classList.remove("none");
			document.querySelector(".nav-arrow-up").classList.remove("display");
			document.querySelector(".nav-arrow-down").classList.add("none1");
			document.querySelector(".nav-arrow-down").classList.remove("display");
			document.querySelector(".nav-arrow-up").classList.add("none");
			document.querySelector(".nav-arrow-up").classList.remove("display");

			dropdown = false;
		}
	});
});
