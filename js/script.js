// плавная прокрутка по якорным ссылкам
let nav = document.querySelector('.header__nav');
let anchors = nav.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener("click", function (event) {
		event.preventDefault();
		let blockID = anchor.getAttribute('href');
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth"
		})
	})
}

// кнопка связи
let popupLinks = document.querySelectorAll('.popup-link');
let body = document.querySelector('body');
let lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

let timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		let popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (event) {
			let popupName = popupLink.getAttribute('href').replace('#', '');
			let currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			event.preventDefault();
		})
	}
}


let popupCloseIcons = document.querySelectorAll('.close-popup');
if (popupCloseIcons.length > 0) {
	for (let index of popupCloseIcons) {
		let element = popupCloseIcons[index]
		element.addEventListener('click', function (event) {
			popupClose(element.closest('.popup'));
			event.preventDefault();
		})
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		let popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", function (event) {
			if (!event.target.closest('.popup__content')) {
				popupClose(event.target.closest('.popup'));
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		bodyUnlock();
		if (doUnlock) {
			bodyLock();
		}
	}
}

// убрать неприятный сдвиг поди вправо за счет убирания скролла и вставления паддинга вместо него
// lock - это для фиксирываних елементов например fixed header
function bodyLock() {
	let lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			let element = lockPadding[index]
			element.style.paddingRight = lockPaddingValue
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	// замок на время для избежания ошибки со скроллом и быстрым повторным открытием
	unlock = false;
	setTimeout(function () {
		unlock = true
	}, timeout)
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				let element = lockPadding[index];
				element.style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout)

	unlock = false;
	setTimeout(function () {
		unlock = true
	}, timeout)
}

document.addEventListener("keydown", function (event) {
	if (event.key == 'Escape' || event.key == ' ') {
		let popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
})
