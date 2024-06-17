let statusFilter = "default";
let basket = [];

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
function addItem() {
	let buttone = document.querySelector(`#${this.id}`);
	buttone.addEventListener("click", function () {
		this.push(basket);
		console.log(basket);
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
			if (statusFilter === "LENS") {
				data.items.forEach(function (item) {
					if (item.Soort === "LENS") {
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
			} else {
				data.items.forEach(function (item) {
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
				});
			}
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
