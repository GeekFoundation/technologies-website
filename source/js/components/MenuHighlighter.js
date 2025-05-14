/**
 * Highlight class of the menu item that is not active
 */
export default class MenuHighlighter {
	/**
		* Constructs a new MenuHighlighter instance.
		* @param {string} [target="[data-menu-highlighter]"] - The target selector.
		* @param {Object} [options={}]
		* @param {string} [options.el="li"] - The element selector.
		* @param {string} [options.classHighlighter="is-highlight"] - The class name for the highlighter.
	*/
	constructor(target = '[data-menu-highlighter]', {
		el,
		classHighlighter,
	} = {}) {
	// Set the target selector.
		this.target = target;
		// Set the element selector, defaulting to 'li'.
		this.el = el || 'li';
		// Set the highlighter class name, defaulting to 'is-highlight'.
		this.classHighlighter = classHighlighter || 'is-highlight';

		// Check if the user's device supports touch events.
		// eslint-disable-next-line no-mixed-operators
		this.isTouch = 'ontouchstart' in window	|| window.DocumentTouch && document instanceof window.DocumentTouch	|| navigator.maxTouchPoints > 0	|| window.navigator.msMaxTouchPoints > 0;

		// Call the init method to initialize the menu highlighter.
		this.init();
	}

	/**
	 * Initializes the wrapper and adds event listeners to handle mouseover and mouseout events.
	 *
	 * @return {void} No return value.
	 */
	init() {
		if (this.isTouch) return;
		const { target } = this;
		const wrapper = document.querySelector(target);

		this.wrapper = wrapper;
		wrapper?.addEventListener('mouseover', () => this._enter());
		wrapper?.addEventListener('mouseout', () => this._leave());
	}

	/**
	 * Event listener for keyboard input.
	 *
	 * @param {Event} e - The keyboard event.
	 * @return {undefined} This function does not return anything.
	 */
	_enter(e) {
		const { target } = e;
		const allElements = Array.from(this.wrapper.querySelectorAll(`:scope ${this.el}`));
		if (allElements.includes(target)) {
			this._addHighlighter(allElements, target);
		}
	}

	/**
	* Remove highlighter from elements in the wrapper
	* @param {NodeList} elements - list of elements to remove highlighter from
	*/
	_leave(elements) {
		this._removeHighlighter(elements);
	}

	/**
	* Adds a highlighter class to all elements in arr except the one with the skip value.
	* @param {array} arr - Array of DOM elements to add the class to.
	* @param {string} skip - Value to skip adding the class to.
	*/
	_addHighlighter(arr, skip) {
		for (let i = 0; i < arr.length; i++) {
			// Skip adding the class if the element's value matches the skip value.
			if (arr[i] === skip) continue;
			// Add the highlighter class to the element.
			arr[i].classList.add(this.classHighlighter);
		}
	}

	/**
	 * Removes a highlighter CSS class from multiple items in an array.
	 *
	 * @param {Array} arr - The array of items to remove the class from.
	 */
	_removeHighlighter(arr) {
		arr.forEach((item) => item.classList).remove(this.classHighlighter);
	}
}
