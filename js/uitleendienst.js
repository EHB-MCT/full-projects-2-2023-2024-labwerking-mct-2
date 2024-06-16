function ini() {
	nextPage();
	fetchList();
}
function fetchList() {
	fetch("https://labbxl.pockethost.io/api/collections/Items/records/?perPage=200")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
}

function nextPage() {
	document.addEventListener("DOMContentLoaded", function () {
		document.querySelector("#submit").addEventListener("click", function () {
			console.log("hey");
			document.querySelector("#fase-1").classList.add("none");
			document.querySelector("#fase-1").classList.remove("display");
			document.querySelector("#fase-2").classList.add("display");
			document.querySelector("#fase-2").classList.remove("none");
		});
	});
}

ini();
