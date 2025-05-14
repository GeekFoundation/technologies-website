/**
 * DropPanel class that allows for creation of dropdown panels
 */
export default class DropPanel {
	/**
	 * Constructor that sets up the dropdown panel
	 * @param {Object} options - An object containing the options for the dropdown panel
	 * @param {String} options.button - A CSS selector for the button that triggers the dropdown
	 * @param {String} options.container - A CSS selector for the container that holds the dropdown content
	 * @param {String} options.openClass - A CSS class that is added to the container when it is open
	 * @param {Function} options.onOpen - A function that is called when the container is opened
	 * @param {Function} options.onClose - A function that is called when the container is closed
	 */
	constructor({
		button = '[data-dropdown="button"]',
		container = '[data-dropdown="wrapper"]',
		openClass = 'is-open',
		onOpen = () => {
		},
		onClose = () => {
		},
	} = {}) {
		this.button  = button;
		this.options = {
			container,
			openClass,
			onOpen,
			onClose,
		};
		
		this._init();
	}
	
	/**
	 * Initializes the function by adding a click event listener to all
	 * elements with the given button selector.
	 */
	_init() {
		const buttonElems = document.querySelectorAll(this.button);
		if (!buttonElems) return;
		
		buttonElems.forEach((buttonElem) => {
			buttonElem.addEventListener('click', this._handleClick.bind(this));
		});
		
		document.addEventListener('click', this._handleClickOutside.bind(this));
	}
	
	/**
	 * Handles a click event on a dropdown button
	 * @param {Object} e - The click event object
	 */
	_handleClick(e) {
		e.preventDefault();
		const wrapperElem = e.target.closest(this.options.container);
		if (!wrapperElem) return;
		
		if (!wrapperElem.classList.contains(this.options.openClass)) {
			this._open(wrapperElem);
		} else {
			this._close(wrapperElem);
		}
	}
	
	/**
	 * Handles a click event outside of the dropdown panel
	 */
	_handleClickOutside() {
		const openPanels = document.querySelectorAll(`${this.options.container}.${this.options.openClass}`);
		openPanels.forEach((openPanel) => {
			if (!openPanel.contains(event.target)) {
				this._close(openPanel);
			}
		});
	}
	
	/**
	 * Opens the dropdown panel
	 * @param {Object} wrapperElem - The container element that holds the dropdown content
	 */
	_open(wrapperElem) {
		wrapperElem.classList.add(this.options.openClass);
		const button = wrapperElem.querySelector(this.button);
		button.setAttribute('aria-expanded', 'true');
		
		if (this.options.onOpen) {
			this.options.onOpen();
		}
	}
	
	/**
	 * Closes the dropdown panel
	 * @param {Object} wrapperElem - The container element that holds the dropdown content
	 */
	_close(wrapperElem) {
		wrapperElem.classList.remove(this.options.openClass);
		const button = wrapperElem.querySelector(this.button);
		button.setAttribute('aria-expanded', 'false');
		
		if (this.options.onClose) {
			this.options.onClose();
		}
	}
}
