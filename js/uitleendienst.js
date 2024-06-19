let statusFilter = "default";
let basket = []; // things in my basket
let catalogus = []; // whole API
import CatalogItem from "./CatalogItem.js";

function ini() {
	fetchList();
	nextPage();
	filterSelection();
}
function filterSelection() {
	document.addEventListener("DOMContentLoaded", function () {
		document.querySelector("#filter").addEventListener("change", function () {
			if (this.value == "Lens") {
				console.log("Lens");
				statusFilter = "LENS";
				fetchList();
			} else if (this.value == "Microfoon") {
				console.log("Microfoon");
				statusFilter = "MICROFOON";
				fetchList();
			} else if (this.value == "Camera") {
				console.log("Camera");
				statusFilter = "CAMERA";
				fetchList();
			} else if (this.value == "VR-brillen") {
				console.log("VR & ARbrillen");
				statusFilter = "VR & AR-BRILLEN";
				fetchList();
			} else if (this.value == "Default") {
				console.log("DEFAULT");
				statusFilter = "DEFAULT";
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
	if (statusFilter === "LENS") {
		catalogus.items.forEach(function (item) {
			if (item.Soort === "LENS") {
				let newHtmlString = "";
				newHtmlString = `<div class="catalog-item flex color3-border">
							<img src="${item.Img}" class="catalog-item-image" alt="" />
							<div class="flex-column catalog-item-info space-between">
								<p class="font1 size2">${item.Naam}</p>
								<p class="font1 size4">${item.Soort}</p>
								<div class="flex item-info space-between">
									<form action="#">
										<select id="item-amount" class="item-amount font1 size4 color5-border color4-bg">
										<option value="0" class="font1">0</option>		
			`;
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
	} else if (statusFilter === "CAMERA") {
		data.items.forEach(function (item) {
			if (item.Soort === "CAMERA") {
				let newHtmlString = "";

				newHtmlString = `			<div class="catalog-item flex color3-border">
							<img src="${item.Img}" class="catalog-item-image" alt="" />
							<div class="flex-column catalog-item-info space-between">
								<p class="font1 size2">${item.Naam}</p>
								<p class="font1 size4">${item.Soort}</p>
								<div class="flex item-info space-between">
									<form action="#">
										<select id="item-amount" class="item-amount font1 size4 color5-border color4-bg">
										<option value="0" class="font1">0</option>		
			`;

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
	} else if (statusFilter === "MICROFOON") {
		data.items.forEach(function (item) {
			if (item.Soort === "MICROFOON") {
				let newHtmlString = "";

				newHtmlString = `			<div class="catalog-item flex color3-border">
							<img src="https://labbxl.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Img}" class="catalog-item-image" alt="" />
							<div class="flex-column catalog-item-info space-between">
								<p class="font1 size2">${item.Naam}</p>
								<p class="font1 size4">${item.Soort}</p>
								<div class="flex item-info space-between">
									<form action="#">
										<select id="item-amount" class="item-amount font1 size4 color5-border color4-bg">
										<option value="0" class="font1">0</option>		
			`;

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
		//////////////////////////////////////////
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
			if (!basketStatus) {
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
			document.querySelector("#fase-1").classList.add("none");
			document.querySelector("#fase-1").classList.remove("display");
			document.querySelector("#fase-2").classList.add("display");
			document.querySelector("#fase-2").classList.remove("none");
		});
	});
}
ini();
