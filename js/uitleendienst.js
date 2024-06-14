document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#submit").addEventListener("click", function () {
		console.log("hey");
		document.querySelector("#fase-1").classList.add("none");
		document.querySelector("#fase-1").classList.remove("display");
		document.querySelector("#fase-2").classList.add("display");
		document.querySelector("#fase-2").classList.remove("none");
	});
});
