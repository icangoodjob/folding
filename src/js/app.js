/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp из css  */
import * as mainFunctions from "./modules/functions.js";
mainFunctions.isWebp();

// Подключение селекта
import "./modules/select.js";

/* Добавление класса touch для HTML если браузер мобильный */
// mainFunctions.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
// mainFunctions.addLoadedClass();
/* Модуль для работы с меню (Бургер) */
// flsFunctions.menuInit();
/* Учет плавающей панели на мобильных устройствах при 100vh */
// flsFunctions.fullVHfix();


// import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

import "./modules/swiper-bundle.min.js";

const applicationSlider = document.querySelector('.slider-container');
const swiperApplication = new Swiper(applicationSlider, {
	loop: false,
	slidesPerView: 'auto',
	spaceBetween: 40,
	slideClass: 'application__item',
	wrapperClass: 'slider-wrapper',
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
	simulateTouch: true,
	speed: 800,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	scrollbar: {
		el: '.swiper-scrollbar',
		dragClass: 'swiper-scrollbar-drag',
		dragSize: 'auto',
		draggable: true,
		hide: false,
	},
	breakpoints: {
		300: {
			spaceBetween: 10,
		},
		460: {
			slidesPerView: 'auto',
			
		},
		992: {
			slidesPerView: 'auto',
			spaceBetween: 40,
		},
	},
});
swiperApplication.scrollbar.init();

let menuOverlay = document.querySelector('.menu-overlay');

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

} else {
	let menuLinks = document.querySelectorAll('.menu__link');
	if (menuLinks.length > 0){
		for (let index = 0; index < menuLinks.length; index++) {
			const menuLink = menuLinks[index];
			if (!menuLink.classList.contains('empty')){
				menuLink.addEventListener("click", function (e) {
					e.preventDefault();
					this.parentElement.classList.toggle('_active');
					menuOverlay.classList.toggle('show');
				});
				menuOverlay.addEventListener('click', () =>{
					menuLink.parentElement.classList.remove('_active');
					menuOverlay.classList.remove('show');
				})
			}
		}
	}
	document.body.classList.add('_pc');
}

const nav = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const headerTop = document.querySelector('.header__top');

window.addEventListener("scroll", scrollPosition);
function scrollPosition(){
	headerNavPosition();
}
function headerNavPosition(){
	/*Позиция элемента от верха страницы
	В данном случае - это 100px
	*/
	const navPosition = nav.getBoundingClientRect().top + pageYOffset;
	const headerTopHeight = headerTop.getBoundingClientRect().height;
	const navHeight = nav.getBoundingClientRect().height; // не используется
	/*Если прокручено больше,чем позиция элемента, т.е. больше 100px
	добавляем класс fixed
	*/
	if (pageYOffset > navPosition){
		header.classList.add('fixed');
	} else if (pageYOffset < headerTopHeight || pageYOffset > navPosition){
		header.classList.remove('fixed');
	}
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
		menuOverlay.classList.toggle('show');
	});
}


// Маска на телефон
window.addEventListener("DOMContentLoaded", function() {
	[].forEach.call( document.querySelectorAll('input[name="tel"]'), function(input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+7 (___) ___-__-__",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, ""),
			new_value = matrix.replace(/[_\d]/g, function(a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function(a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
			if (event.type == "blur" && this.value.length < 5)  this.value = ""
		}
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);
	input.addEventListener("keydown", mask, false)
});
});
	// Запрещаем вводить цифры в input[type="text"] 
	function noDigits(event) {
		if ("1234567890".indexOf(event.key) != -1){
			event.preventDefault();
		}
	}