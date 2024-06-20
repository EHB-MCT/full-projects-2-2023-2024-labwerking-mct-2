let statusFilter = "DEFAULT";
let basket = []; // things in my basket
let catalogus = []; // whole API
import CatalogItem from "./CatalogItem.js";
let projectText = "";
let naam = "";
let startDatum = "";
let eindDatum = "";
let ehbStudent = false;
let email = "";
let teleNummer = "";

function ini() {
	fetchList();
	nextPage();
	filterSelection();
	searchFilter();
	sendInfoSecondPage();
	EhbStudentKeuze();
}
function searchFilter() {
	const searchInput = document.querySelector("#SearchInput");
	searchInput.addEventListener("keydown", function (event) {
		if (event.key == "Enter") {
			console.log(searchInput.value);
			statusFilter = "SEARCH";
			renderList(catalogus);
		}
	});
}
function filterSelection() {
	document.addEventListener("DOMContentLoaded", function () {
		document.querySelector("#filter").addEventListener("change", function () {
			if (this.value == "VR & AR BRILLEN") {
				console.log("VR & AR BRILLEN");
				statusFilter = "VR & AR BRILLEN";
				fetchList();
			} else if (this.value == "OPNAME") {
				console.log("OPNAME");
				statusFilter = "OPNAME";
				fetchList();
			} else if (this.value == "MOTION") {
				console.log("MOTION");
				statusFilter = "MOTION";
				fetchList();
			} else if (this.value == "AUDIO") {
				console.log("AUDIO");
				statusFilter = "AUDIO";
				fetchList();
			} else if (this.value == "DEFAULT") {
				console.log("DEFAULT");
				statusFilter = "DEFAULT";
				fetchList();
			} else if (this.value == "EXTRA") {
				console.log("EXTRA");
				statusFilter = "EXTRA";
				fetchList();
			} else if (this.value == "BELICHTING") {
				console.log("BELICHTING");
				statusFilter = "BELICHTING";
				fetchList();
			}
		});
	});
}
function addRemoveItem() {
	const buttons = document.querySelectorAll(".btn-item");
	buttons.forEach((button) => {
		button.addEventListener("click", function () {
			console.log(`Button id ${this.id} `);
			let itemId = this.id;
			const selectedValue = document.querySelector(`#item-amount${itemId}`).value;

			if (basket.indexOf(itemId) === -1 && selectedValue > 0) {
				const itemCatalogus = new CatalogItem(this.id, selectedValue);
				basket.push(itemCatalogus);
			} else {
				basket = basket.filter(function (basketItems) {
					return basketItems._id !== itemId;
				});
			}
			console.log(basket);
			renderList(catalogus);
		});
	});
}
function fetchList() {
	fetch("https://labbxl.pockethost.io/api/collections/Items/records/?perPage=200")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			document.querySelector(".catalog").innerHTML = "";
			console.log(data);

			catalogus = data;
			renderList(catalogus);
		});
}
function renderList(catalogus) {
	if (statusFilter === "DEFAULT") {
		document.querySelector(".materials").innerHTML = "";
		document.querySelector(".catalog").innerHTML = "";
		catalogus.items.forEach(function (item) {
			let basketStatus = false;
			let newHtmlString = "";
			basket.forEach(function (BasketItem) {
				if (item.id == BasketItem._id) {
					newHtmlString = `<div class="catalog-item2 flex color3-border">
							<div class="catalog-item-image">
							<img src="https://labbxl.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Img}"  alt="" />
							</div>							<div class="flex-column catalog-item-info space-between">
								<p class="font1 size3">${item.Naam}</p>
								<p class="font1 size4">${item.Soort}</p>
								<div class="flex item-info space-between">
									<p class="font1 size4" id="item-amount${item.id}" value="0">${BasketItem._amount}</p>
									<button class="font1 size4 btn-item" id="${item.id}">Verwijder</button>
								</div>
							</div>
						</div>`;
					document.querySelector(".materials").innerHTML += newHtmlString;
					basketStatus = true;
				}
			});
			if (!basketStatus) {
				newHtmlString = `<div class="catalog-item flex color3-border">
							<div class="catalog-item-image">
							<img src="https://labbxl.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Img}"  alt="" />
							</div>					<div class="flex-column catalog-item-info space-between">
						<p class="font1 size2">${item.Naam}</p>
						<p class="font1 size4">${item.Soort}</p>
						<div class="flex item-info space-between">
							<form action="#">
								<select id="item-amount${item.id}" class="item-amount font1 size4 color5-border color4-bg">
								<option value="0" class="font1">0</option>`;

				for (let i = 0; i < item.InStock; i++) {
					newHtmlString += `					<option value="${i + 1}" class="font1">${i + 1}</option>`;
				}
				newHtmlString += `
								</select>
								</form>
							<button class="font1 size4 btn-item" id="${item.id}">Voeg toe</button>
						</div>
					</div>
				</div>`;
				document.querySelector(".catalog").innerHTML += newHtmlString;
			}
		});
	} else if (statusFilter === "SEARCH") {
		document.querySelector(".materials").innerHTML = "";
		document.querySelector(".catalog").innerHTML = "";
		console.log(catalogus);
		catalogus.items.forEach(function (item) {
			let basketStatus = false;
			let newHtmlString = "";
			basket.forEach(function (BasketItem) {
				if (item.id == BasketItem._id) {
					newHtmlString = `<div class="catalog-item flex color3-border">
							<img src="https://labbxl.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Img}" class="catalog-item-image" alt="" />
							<div class="flex-column catalog-item-info space-between">
								<p class="font1 size2">${item.Naam}</p>
								<p class="font1 size4">${item.Soort}</p>
								<div class="flex item-info space-between">
									<p class="font1 size2" id="item-amount${item.id}" value="0">${BasketItem._amount}</p>
									<button class="font1 size4 btn-item" id="${item.id}">Verwijder</button>
								</div>
							</div>
						</div>`;
					document.querySelector(".materials").innerHTML += newHtmlString;
					basketStatus = true;
				}
			});
			let text1 = item.Naam.toLowerCase();
			let text2 = document.querySelector("#SearchInput").value.toLowerCase();
			if (!basketStatus && text1.includes(text2)) {
				newHtmlString = `<div class="catalog-item flex color3-border">
					<img src="https://labbxl.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Img}" class="catalog-item-image" alt="" />
					<div class="flex-column catalog-item-info space-between">
						<p class="font1 size2">${item.Naam}</p>
						<p class="font1 size4">${item.Soort}</p>
						<div class="flex item-info space-between">
							<form action="#">
								<select id="item-amount${item.id}" class="item-amount font1 size4 color5-border color4-bg">
								<option value="0" class="font1">0</option>`;

				for (let i = 0; i < item.InStock; i++) {
					newHtmlString += `					<option value="${i + 1}" class="font1">${i + 1}</option>`;
				}
				newHtmlString += `
								</select>
								</form>
							<button class="font1 size4 btn-item" id="${item.id}">Voeg toe</button>
						</div>
					</div>
				</div>`;
				document.querySelector(".catalog").innerHTML += newHtmlString;
			}
		});
	} else {
		document.querySelector(".materials").innerHTML = "";
		document.querySelector(".catalog").innerHTML = "";
		catalogus.items.forEach(function (item) {
			let basketStatus = false;
			let newHtmlString = "";
			basket.forEach(function (BasketItem) {
				if (item.id == BasketItem._id) {
					newHtmlString = `<div class="catalog-item flex color3-border">
							<img src="https://labbxl.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Img}" class="catalog-item-image" alt="" />
							<div class="flex-column catalog-item-info space-between">
								<p class="font1 size2">${item.Naam}</p>
								<p class="font1 size4">${item.Soort}</p>
								<div class="flex item-info space-between">
									<p class="font1 size2" id="item-amount${item.id}" value="0">${BasketItem._amount}</p>
									<button class="font1 size4 btn-item" id="${item.id}">Verwijder</button>
								</div>
							</div>
						</div>`;
					document.querySelector(".materials").innerHTML += newHtmlString;
					basketStatus = true;
				}
			});
			if (!basketStatus && item.Soort == statusFilter) {
				newHtmlString = `<div class="catalog-item flex color3-border">
					<img src="https://labbxl.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Img}" class="catalog-item-image" alt="" />
					<div class="flex-column catalog-item-info space-between">
						<p class="font1 size2">${item.Naam}</p>
						<p class="font1 size4">${item.Soort}</p>
						<div class="flex item-info space-between">
							<form action="#">
								<select id="item-amount${item.id}" class="item-amount font1 size4 color5-border color4-bg">
								<option value="0" class="font1">0</option>`;

				for (let i = 0; i < item.InStock; i++) {
					newHtmlString += `					<option value="${i + 1}" class="font1">${i + 1}</option>`;
				}
				newHtmlString += `
								</select>
								</form>
							<button class="font1 size4 btn-item" id="${item.id}">Voeg toe</button>
						</div>
					</div>
				</div>`;
				document.querySelector(".catalog").innerHTML += newHtmlString;
			}
		});
	}
	addRemoveItem();
}
function nextPage() {
	document.addEventListener("DOMContentLoaded", function () {
		document.querySelector("#submit").addEventListener("click", function () {
			console.log("hey");

			projectText = document.querySelector(".uitleen-textarea").value;

			document.querySelector("#fase-1").classList.add("none");
			document.querySelector("#fase-1").classList.remove("display");
			document.querySelector("#fase-2").classList.add("display");
			document.querySelector("#fase-2").classList.remove("none");
		});
	});
}
function sendInfoSecondPage() {
	document.addEventListener("DOMContentLoaded", function () {
		document.querySelector("#submit2").addEventListener("click", function () {
			console.log("Button Pressed");
			console.log(document.querySelector("#textID").value);
			naam = document.querySelector("#textID").value;

			console.log(document.querySelector("#startDatumID").value);
			startDatum = document.querySelector("#startDatumID").value;

			console.log(document.querySelector("#eindDatumID").value);
			eindDatum = document.querySelector("#eindDatumID").value;

			console.log(document.querySelector("#emailID").value);
			email = document.querySelector("#emailID").value;

			console.log(document.querySelector("#teleNummerID").value);
			teleNummer = document.querySelector("#teleNummerID").value;

			console.log(ehbStudent);
			console.log(projectText);

			const nameRegex = /^[a-zA-Z ]+$/;
			if (!nameRegex.test(naam)) {
				alert("Vul een geldige naam in (alleen letters en spaties toegestaan).");
				return;
			}

			const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
			if (!emailRegex.test(email)) {
				alert("Vul een geldig e-mailadres in.");
				return;
			}

			const phoneRegex = /^\d{10}$/;
			if (!phoneRegex.test(teleNummer)) {
				alert("Vul een geldig telefoonnummer in (10 cijfers).");
				return;
			}

			const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
			if (!dateRegex.test(startDatum)) {
				alert("Vul een geldige datum in (DD-MM-JJJJ).");
				return;
			}
			if (!dateRegex.test(eindDatum)) {
				alert("Vul een geldige datum in (DD-MM-JJJJ).");
				return;
			}
			basket.forEach(function (Item) {
				const data = {
					Naam: `${naam}`,
					UitSTock: Item._amount,
					StartDatum: `${startDatum}`,
					EindDatum: `${eindDatum}`,
					EHBStudent: ehbStudent,
					Email: `${email}`,
					Telefoonnummer: teleNummer,
					ProjectInformatie: `${projectText}`,
					ItemID: `${Item._id}`,
				};
				fetch("https://labbxl.pockethost.io/api/collections/Uitlenen/records", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {});
			});

			alert("Uw items zijn successvol gereserveerd");
			window.location.href = "javascript:history.back()";
		});
	});
}
function EhbStudentKeuze() {
	const EhbKeuzeButton = document.querySelectorAll("input[name='EHB-Student']");
	EhbKeuzeButton.forEach((button) => {
		button.addEventListener("change", function () {
			if (this.value === "TRUE") {
				ehbStudent = true;
			} else if (this.value === "FALSE") {
				ehbStudent = false;
			}
		});
	});
}
ini();
