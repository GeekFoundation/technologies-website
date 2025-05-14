/**
 * A class to handle tabs functionality.
 */
export default class Tabs {
	/**
	 * Creates an instance of Tabs.
	 * @param {Object} options - The options to configure the tabs.
	 * @param {string|HTMLElement} options.container - The selector or DOM element for the tabs container.
	 * @param {string} options.button - The selector for the tabs buttons.
	 * @param {string} options.item - The selector for the tabs items.
	 * @param {string} options.classActive - The class name for the active tab.
	 * @param {Function} options.onChange - The callback function to be executed when a tab is changed.
	 */
	constructor({
		container = '[data-tabs="wrapper"]',
		button = '[data-tabs="link"]',
		item = '[data-tabs="item"]',
		classActive = 'active',
		onChange = () => {
		},
	} = {}) {
		this.options = {
			container,
			button,
			item,
			classActive,
			onChange,
		};
		this._init();
	}
	
	/**
	 * Initializes the tabs functionality.
	 * @private
	 */
	_init() {
		const {
				  container,
				  item,
				  button,
			  } = this.options;
		// Get the tabs container element
		// eslint-disable-next-line no-nested-ternary
		const wrapper = typeof container === 'string' ? document.querySelector(container) : container instanceof HTMLElement ? container : null;
		
		if (!wrapper) return;
		
		// Set the first tab as active
		const activeItem = wrapper.querySelector(item);
		
		if (!activeItem) return;
		activeItem.classList.add('active');
		
		// Attach click event listeners to the tabs buttons
		wrapper.querySelectorAll(button).forEach((el) => {
			el.addEventListener('click', this._click.bind(this));
		});
	}
	
	/**
	 * Handles the click event on a tab button.
	 * @param {MouseEvent} e - The click event.
	 * @private
	 */
	_click(e) {
		e.preventDefault();
		const button = e.target.closest(this.options.button);
		
		if (button && !button.classList.contains(this.options.classActive)) {
			// Get the target tab and show it
			const { target } = button.dataset;
			this._hide();
			this._show(button, target);
		}
	}
	
	/**
	 * Shows the specified tab.
	 * @param {HTMLElement} el - The tab button element.
	 * @param {string} target - The selector for the target tab.
	 * @private
	 */
	_show(el, target) {
		const {
				  classActive,
				  onChange,
			  } = this.options;
		// Set the tab button and the target tab as active
		el.classList.add(classActive);
		document.querySelector(target)?.classList.add(classActive);
		onChange?.();
	}
	
	/**
	 * Hides all tabs.
	 * @private
	 */
	_hide() {
		const {
				  container,
				  item,
				  button,
				  classActive,
			  } = this.options;
		// Get the tabs container element
		// eslint-disable-next-line no-nested-ternary
		const wrapper = typeof container === 'string' ? document.querySelector(container) : container;
		
		if (!wrapper) return;
		
		// Remove the active class from all tabs
		const items = wrapper.querySelectorAll(`${item}.${classActive}`);
		const buttons = wrapper.querySelectorAll(`${button}.${classActive}`);
		
		[...items].forEach((el) => el.classList.remove(classActive));
		[...buttons].forEach((el) => el.classList.remove(classActive));
	}
}
