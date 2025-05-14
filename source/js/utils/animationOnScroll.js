import { gsap }          from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Refresh ScrollTrigger
 */
function animationOnScrollRefresh() {
	ScrollTrigger.refresh();
}

/**
 * Fades an element in and moves it up on scroll using GSAP and ScrollTrigger
 *
 * @param {HTMLElement} el - The element to animate
 * @returns {HTMLElement|boolean} - The element or false if none provided
 */
function animateFadeInUpOnScroll(el) {
	// If no element is provided, return false
	if (!el) return false;

	// Register ScrollTrigger plugin with GSAP
	gsap.registerPlugin(ScrollTrigger);

	// Create a timeline for the animation, triggered when el enters viewport
	const timeline = gsap.timeline({
		scrollTrigger : {
			trigger : el,
			markers : false,
			start   : 'top bottom',
		},
	});

	// Add an animation to the timeline that fades el in and moves it up
	timeline.from(el, {
		duration   : 2.5,
		autoAlpha  : 0,
		y          : 100,
		ease       : 'expo.out',
		clearProps : 'all',
	}, '+=0.3');

	// Return the element
	return el;
}

/**
 * Animates an element on scroll by zooming it in.
 * @param {HTMLElement} el - The element to animate.
 * @returns {HTMLElement} - The animated element.
 */
function animationOnScrollZoomIn(el) {
	// If there is no element, return false.
	if (!el) {
		return false;
	}

	// Find the inner element to animate.
	const inner = el.querySelector('[data-animation-on-scroll="inner"]');

	// If there is no inner element, return false.
	if (!inner) {
		return false;
	}

	// Register ScrollTrigger plugin.
	gsap.registerPlugin(ScrollTrigger);

	// Create a timeline for the animation.
	const timeline = gsap.timeline({
		scrollTrigger : {
			trigger : el,
			markers : false,
			start   : 'top 90%',
		},
	});

	// Add the zoom in animation to the timeline.
	timeline.from(inner, {
		duration   : 1.5,
		autoAlpha  : 0,
		scale      : 1.2,
		ease       : 'power2.out',
		clearProps : 'all',
	});

	// Return the animated element.
	return el;
}

/**
 * Animates an element with a skew-in-up effect on scroll using GSAP and ScrollTrigger.
 * @param {HTMLElement} el - The element to animate.
 * @returns {HTMLElement} - The animated element.
 */
function animationOnScrollSkewInUp(el) {
	// Return false if the element is falsy
	if (!el) return false;

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	// Create a timeline with ScrollTrigger
	const timeline = gsap.timeline({
		scrollTrigger : {
			trigger : el, // The element to use as trigger
			markers : false, // Whether to show markers
			start   : 'top bottom', // When to start the animation
		},
	});

	// Animation properties
	const duration = 2;
	const skewY = 5;
	const transformOrigin = 'left top';
	const autoAlpha = 0;
	const y = 100;
	const ease = 'expo.out';
	const clearProps = 'all';

	// Add the animation to the timeline with a delay
	timeline.from(
		el,
		{
			duration,
			skewY,
			transformOrigin,
			autoAlpha,
			y,
			ease,
			clearProps,
		},
		'+=0.3',
	);

	// Return the animated element
	return el;
}

/**
 * Animates an element by stretching it upwards while fading it in on scroll.
 * @param {HTMLElement} el - The element to be animated.
 * @returns {HTMLElement} The animated element.
 */
function animationOnScrollStretchInUp(el) {
	// If no element is provided, exit the function
	if (!el) return false;

	// Create a timeline for the animation using gsap
	const tl = gsap.timeline({
		scrollTrigger : {
			trigger : el,
			markers : false,
			start   : 'top bottom',
		},
	});

	// Add the animation to the timeline
	tl.from(el, {
		duration        : 2,
		autoAlpha       : 0,
		y               : 100,
		scaleY          : 1.4,
		transformOrigin : 'top',
		ease            : 'expo.out',
		clearProps      : 'all',
	}, '+=0.2');

	// Return the animated element
	return el;
}

export default animateFadeInUpOnScroll;
export {
	animationOnScrollZoomIn,
	animationOnScrollSkewInUp,
	animationOnScrollStretchInUp,
};
