document.addEventListener("DOMContentLoaded", function () {
	let menu = false;
	document.querySelector("#icon").addEventListener("click", function () {
		if (menu == false) {
			document.querySelector("#menu").classList.add("visible");
			document.querySelector("#menu").classList.remove("hidden");
			document.querySelector("#cross").classList.add("visible");
			document.querySelector("#cross").classList.remove("hidden");
			document.querySelector("#bars").classList.add("hidden");
			document.querySelector("#bars").classList.remove("visible");
			menu = true;
		} else if (menu == true) {
			document.querySelector("#menu").classList.add("hidden");
			document.querySelector("#menu").classList.remove("visible");
			document.querySelector("#bars").classList.add("visible");
			document.querySelector("#bars").classList.remove("ghidden");
			document.querySelector("#cross").classList.add("hidden");
			document.querySelector("#cross").classList.remove("visible");
			menu = false;
		}
	});
});
