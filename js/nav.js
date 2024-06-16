document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#icon").addEventListener("click", function () {
		document.querySelector("#menu").classList.add("visible");
		document.querySelector("#menu").classList.remove("hidden");
		document.querySelector("#navigation").classList.add("hidden");
		document.querySelector("#navigation").classList.remove("visible");
	});
	document.querySelector("#icon2").addEventListener("click", function () {
		document.querySelector("#menu").classList.add("hidden");
		document.querySelector("#menu").classList.remove("visible");
		document.querySelector("#navigation").classList.add("visible");
		document.querySelector("#navigation").classList.remove("ghidden");

		
	});
});
