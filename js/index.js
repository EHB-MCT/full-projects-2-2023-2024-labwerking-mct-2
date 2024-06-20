document.addEventListener("DOMContentLoaded", function () {
	let slideIndex = 0;
	let slides = document.getElementsByClassName("mySlides");

	function showSlides() {
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.zIndex = -1;
			if (/Mobi/i.test(navigator.userAgent)) {
				if (i === slideIndex) {
					slides[i].style.transform = "translateX(0%) rotateY(0deg) scale(1.5)";
					slides[i].style.zIndex = 2;
					slides[i].style.textAlign = "center";
				} else if (i === (slideIndex + 1) % slides.length) {
					slides[i].style.transform = "translateX(-27.5vw) translateY(-7.5%) rotateY(0deg) scale(1)";
					slides[i].style.zIndex = 0;
					slides[i].style.textAlign = i === (slideIndex + 1) % slides.length ? "left" : "right";
				} else if (i === (slideIndex + 2) % slides.length) {
					slides[i].style.transform = "translateX(27.5vw) translateY(-7.5%) rotateY(0deg) scale(1)";
					slides[i].style.zIndex = 1;
					slides[i].style.textAlign = i === (slideIndex + 2) % slides.length ? "right" : "left";
				}
			} else {
				if (i === slideIndex) {
					slides[i].style.transform = "translateX(0%) rotateY(0deg) scale(1.5)";
					slides[i].style.zIndex = 2;
					slides[i].style.textAlign = "center";
				} else if (i === (slideIndex + 1) % slides.length) {
					slides[i].style.transform = "translateX(-15vw) translateY(-7.5%) rotateY(0deg) scale(1)";
					slides[i].style.zIndex = 0;
					slides[i].style.textAlign = i === (slideIndex + 1) % slides.length ? "left" : "right";
				} else if (i === (slideIndex + 2) % slides.length) {
					slides[i].style.transform = "translateX(15vw) translateY(-7.5%) rotateY(0deg) scale(1)";
					slides[i].style.zIndex = 1;
					slides[i].style.textAlign = i === (slideIndex + 2) % slides.length ? "right" : "left";
				}
			}
		}
		slideIndex = (slideIndex + 1) % slides.length;
		setTimeout(showSlides, 4000);
	}

	showSlides();
});
