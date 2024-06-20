document.addEventListener("DOMContentLoaded", function () {
	if (/Mobi/i.test(navigator.userAgent)) {
		let slideIndex2 = 0;
		let slides2 = document.getElementsByClassName("mySlides2");

		function showSlides2() {
			for (let i = 0; i < slides2.length; i++) {
				slides2[i].style.zIndex = -1;
				if (i === slideIndex2) {
					slides2[i].style.transform = "translateX(0%) rotateY(0deg) scale(1.4)";
					slides2[i].style.zIndex = 2;
					slides2[i].style.textAlign = "center";
				} else if (i === (slideIndex2 + 1) % slides2.length) {
					slides2[i].style.transform = "translateX(-30vw) translateY(-7.5%) rotateY(0deg) scale(1)";
					slides2[i].style.zIndex = 0;
					slides2[i].style.textAlign = i === (slideIndex2 + 1) % slides2.length ? "left" : "right";
				} else if (i === (slideIndex2 + 2) % slides2.length) {
					slides2[i].style.transform = "translateX(30vw) translateY(-7.5%) rotateY(0deg) scale(1)";
					slides2[i].style.zIndex = 1;
					slides2[i].style.textAlign = i === (slideIndex2 + 2) % slides2.length ? "right" : "left";
				}
			}
			slideIndex2 = (slideIndex2 + 1) % slides2.length;
			setTimeout(showSlides2, 4000);
		}

		showSlides2();
	} else {
		let slideIndex = 0;
		let slides = document.getElementsByClassName("mySlides");

		function showSlides() {
			for (let i = 0; i < slides.length; i++) {
				slides[i].style.zIndex = -1;
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
			slideIndex = (slideIndex + 1) % slides.length;
			setTimeout(showSlides, 4000);
		}

		showSlides();
	}
});
