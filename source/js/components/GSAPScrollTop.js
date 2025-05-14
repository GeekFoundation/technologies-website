import { gsap }         from 'gsap'; // Import the gsap library and ScrollToPlugin
import ScrollToPlugin from 'gsap/ScrollToPlugin';

export default class GSAPScrollTop { // Export the class as a default
	constructor({
		scrollToElement = document.querySelector('[data-scroll-to]'), // Set the default scrollToElement as the first element with the 'data-scroll-to' attribute
		onInit = () => {}, // Set default values for onInit and onClick
		onClick = () => {},
	} = {}) {
		this.scrollToElement = scrollToElement;
		this.scrollToElementType = scrollToElement.tagName; // Store the type of the scrollToElement

		this.options = {
			onInit,
			onClick,
		};

		this._init(); // Initialize the class
	}

	/**
     * Scroll to the specified hash target when a link is clicked
     * @param {Event} e The click event
     * @returns {boolean} Returns false to prevent the page from scrolling
     */
	_scrollToHash(e) {
		e.preventDefault(); // Prevent the default link behavior
		const target = e.target.closest(this.scrollToElementType); // Find the closest element of the scrollToElementType
		const hash = target.dataset.target || target.getAttribute('href'); // Get the hash from the data-target attribute or the href attribute
		if (!hash) {
			console.log('no href or data-target attribute found on element');
			return false; // Exit if the hash is not found
		}
		const elem = document.querySelector(hash); // Find the element with the specified hash
		if (!elem) {
			console.log(`Hash target element not found ${hash}`);
			return false; // Exit if the element is not found
		}
		gsap.to(window, { // Scroll to the element using gsap
			scrollTo : {
				y        : elem,
				offsetY  : 20, // Offset the scroll position by 20 pixels to account for fixed headers
				autoKill : true,
			},
			ease : 'power2', // Use the power2 easing function
		});

		this.options.onClick(); // Call the onClick function
		return false; // Return false to prevent the page from scrolling
	}

	/**
     * Initialize the class by registering the ScrollToPlugin and adding a click event listener to the scrollToElement
     */
	_init() {
		if (!this.scrollToElement) return; // Exit if the scrollToElement is not found

		gsap.registerPlugin(ScrollToPlugin); // Register the ScrollToPlugin with gsap

		this.scrollToElement.addEventListener('click', this._scrollToHash.bind(this)); // Add a click event listener to the scrollToElement
		this.options.onInit(); // Call the onInit function
	}
}
