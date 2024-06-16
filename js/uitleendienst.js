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
			document.querySelector(".catalog").innerHTML = "";
			

			console.log(data);

			data.items.forEach(function(item) {
				let newHtmlString = "";
				console.log(item);
				newHtmlString = 
				`			<div class="catalog-item flex color3-border">
								<img src="${item.Img}" class="catalog-item-image" alt="" />
								<div class="flex-column catalog-item-info space-between">
									<p class="font1 size2">${item.Naam}</p>
									<p class="font1 size4">${item.Soort}</p>
									<div class="flex item-info space-between">
										<form action="#">
											<select id="item-amount" class="item-amount font1 size4 color5-border color4-bg">				
				`;
	for(let i=0;i<item.InStock;i++){
		newHtmlString += `					<option value="${i}" class="font1">${i}</option>`
					}
		newHtmlString += `
											</select>
										</form>
										<button class="font1 size4 btn-item">Voeg toe</button>
									</div>
								</div>
							</div>`
				
				

				document.querySelector(".catalog").innerHTML += newHtmlString;
			});
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
