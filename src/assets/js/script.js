let timeout = -1;
let container;
let sliderDots;
let nextBtn;
let prevBtn;
let dotsRatio = 1;
let activeDot = 1;

const getDotsNumber = () => {
	const SlIDES_MAP = {
		1: 4,
		2: 3,
		3: 2,
	};

	return SlIDES_MAP[Math.floor(container.offsetWidth / 255)];
};

const appendDots = () => {
	sliderDots.innerHTML = '';
	for (let index = 1; index <= dotsRatio; index++) {
		const dot = document.createElement('div');
		dot.classList.add('slider__dot');
		sliderDots.append(dot);

		if (index === 1) dot.classList.add('active');
	}

	container.scrollLeft = 0;
	activeDot = 1;
};

// Checks if the end/start of horizontal scrollbar is reached
const toggleButtonsStatus = () => {
	prevBtn.classList.toggle('disabled', container.scrollLeft === 0);
	nextBtn.classList.toggle(
		'disabled',
		container.scrollLeft >=
			container.scrollWidth - container.offsetWidth - 10,
	);
};

const removeActiveDots = () => {
	const dots = Array.from(sliderDots.children);
	dots.forEach((dot) => {
		dot.classList.remove('active');
	});
};

document.addEventListener('DOMContentLoaded', () => {
	const scrollToTop = document.querySelector('[data-scroll-to-top]');
	const tabLabel = Array.from(document.querySelectorAll('[data-tab]'));
	const tabPanel = Array.from(document.querySelectorAll('[data-panel]'));
	const HamburgerBtn = document.querySelector('[data-hamburger]');
	const navMenu = document.querySelector('[data-nav]');
	const closeBtn = document.querySelector('[data-close]');

	nextBtn = document.querySelector('.slider__button--next');
	prevBtn = document.querySelector('.slider__button--prev');
	container = document.querySelector('.related-posts__grid');
	sliderDots = document.querySelector('.slider__dots');
	dotsRatio = getDotsNumber();

	if (scrollToTop) {
		scrollToTop.onclick = () => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		};
	}

	HamburgerBtn.onclick = () => {
		navMenu.classList.toggle('header__nav--active')
	};

	closeBtn.onclick = () => {
		navMenu.classList.toggle('header__nav--active')
	};

	tabLabel.forEach((tab, index) => {
		tab.onclick = () => {
			tabLabel.forEach((tab) => tab.classList.remove('tabs__label--active'))
			tab.classList.add('tabs__label--active');

			tabPanel.forEach((label) => label.classList.remove('tabs__groups--active'))
			tabPanel[index].classList.add('tabs__groups--active');
		}
	});

	// Moves scrollbar to right
	nextBtn.onclick = () => {
		container.scrollLeft += 285;
		const dots = sliderDots.children;
		activeDot += 1;
		if (activeDot <= dots?.length) removeActiveDots();
		sliderDots.children[activeDot - 1]?.classList.add('active');
	};

	// Moves scrollbar to left
	prevBtn.onclick = () => {
		container.scrollLeft -= 285;
		activeDot -= 1;
		removeActiveDots();
		sliderDots.children[activeDot - 1]?.classList.add('active');
	};

	const resizeObserver = new ResizeObserver(() => {
		dotsRatio = getDotsNumber();
		clearTimeout(timeout);
		timeout = setTimeout(appendDots, 100);
	});

	resizeObserver.observe(container);

	container.onscroll = () => {
		toggleButtonsStatus();
	};
});
