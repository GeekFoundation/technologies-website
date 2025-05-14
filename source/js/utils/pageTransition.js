import { gsap } from 'gsap';

/**
 * Function - Smooth page translation
 * @param preloader {String} - Preloader data name, by default [data-transition="wrapper"]
 * @param overlay {String} - Data attribute for the overlay of a preload block, by default [data-transition="overlay"]
 * @param preloaderInner {String} - Data attribute for the inner block of a preload block, by default [data-transition="preloader"]
 * @param header {String} - Data attribute for website header, by default [data-transition="header"]
 * @param content {String} - Data attribute for content, by default [data-transition="content"]
 * @param page {String} - Data attribute for general site content wrapper, by default [data-transition="page"]
 * @param hero {String} - Data attribute for hero block elements, by default [data-transition="hero"]
 * @param appear {String} - Data attribute for any other elements, by default [data-transition="appear"]
 * @param link {String} - Data attribute for links with page animation, by default [data-transition="link"]
 */

export default function pageTransition({
	preloader = '[data-transition="wrapper"]',
	overlay = '[data-transition="overlay"]',
	preloaderInner = '[data-transition="preloader"]',
	header = '[data-transition="header"]',
	content = '[data-transition="content"]',
	page = '[data-transition="page"]',
	hero = '[data-transition="hero"]',
	appear = '[data-transition="appear"]',
}) {
	if (!document.querySelector(preloader)) return;

	// Transitions In
	function pageTransitionIn() {
		const timeline = gsap.timeline({
			defaults : {
				duration : 1,
				ease     : 'expo.inOut',
			},
		});

		timeline.set(preloader, { autoAlpha : 1 });

		if (document.querySelector(overlay)) {
			timeline.to(
				overlay,
				{
					scaleY          : 1,
					transformOrigin : 'center bottom',
				},
				0,
			);
		}

		// Page wrapper
		if (document.querySelector(page)) {
			timeline.to(
				page,
				{
					y         : -80,
					autoAlpha : 0,
				},
				0,
			);
		}

		if (document.querySelector(header)) {
			timeline.to(
				header,
				{
					y         : -20,
					autoAlpha : 0,
				},
				0,
			);
		}
		if (document.querySelector(preloaderInner)) {
			timeline.to(preloaderInner, { autoAlpha : 1 }, 0.4);
		}
	}

	// Transitions Out
	function pageTransitionOut() {
		const timeline = gsap.timeline();

		if (document.querySelector(preloaderInner)) {
			timeline.to(
				preloaderInner,
				{
					duration  : 1,
					autoAlpha : 0,
					ease      : 'expo.inOut',
				},
			);
		}

		// Transition Overlay
		if (document.querySelector(overlay)) {
			timeline.to(
				overlay,
				{
					duration        : 1,
					scaleY          : 0,
					transformOrigin : 'center top',
					ease            : 'expo.inOut',
				},
				0.3,
			);
		}

		// Site Header
		if (document.querySelector(header)) {
			// Header
			timeline.from(
				header,
				{
					duration   : 1,
					y          : 20,
					autoAlpha  : 0,
					ease       : 'expo.inOut',
					clearProps : 'all',
				},
				0.6,
			);
		}

		// Hero block animation
		if (document.querySelector(hero)) {
			timeline.from(
				hero,
				{
					duration   : 1.5,
					y          : 80,
					autoAlpha  : 0,
					stagger    : 0.3,
					ease       : 'expo.inOut',
					clearProps : 'all',
				},
				0.8,
			);
		}

		// Page other elements appear
		if (document.querySelector(appear)) {
			timeline.from(
				appear,
				{
					duration   : 1.5,
					autoAlpha  : 0,
					y          : 80,
					ease       : 'expo.inOut',
					clearProps : 'all',
				},
				0.8,
			);
		}

		if (document.querySelector(content)) {
			timeline.from(
				content,
				{
					duration   : 1.5,
					autoAlpha  : 0,
					y          : 80,
					ease       : 'expo.inOut',
					clearProps : 'all',
				},
				0.8,
			);
		}

		// Preloader
		if (document.querySelector(preloader)) {
			timeline.set(
				preloader,
				{
					duration  : 1,
					autoAlpha : 0,
					ease      : 'expo.inOut',
				},
			);
		}
	}

	// ================
	// Wait until the whole page is loaded.
	window.addEventListener('load', () => {
		// Async
		setTimeout(pageTransitionOut, 0);
	});

	// Force page a reload when browser "Back" button click.
	// =====================================================
	window.onpageshow = function (event) {
		if (event.persisted) {
			window.location.reload();
		}
	};

	// On link click
	// ==============
	const transitionLink = document.querySelectorAll(
		'a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not(.is-disabled):not(.is-not-transition)',
	);
	transitionLink.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target.closest('a');

			setTimeout((url) => {
				window.location = url;
			}, 1000, target.href);

			pageTransitionIn();
		});
	});
}
