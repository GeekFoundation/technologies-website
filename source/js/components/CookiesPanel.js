export default class CookiesPanel {
	/**
	 * Class constructor for initializing the object.
	 *
	 * @param {string} cookies - The cookies for the object.
	 * @param {HTMLElement} wrapper - The wrapper for the object.
	 * @param {HTMLElement} button - The button for the object.
	 */
	constructor({
		cookies,
		wrapper,
		button
	} = {}) {
		this.cookies = cookies;
		this.wrapper = wrapper;
		this.button  = button;
	}
	
	/**
	 * Retrieves the value of a cookie by its name.
	 * @param {string} cookieName - The name of the cookie.
	 * @returns {string|null} - The value of the cookie, or null if the cookie does not exist.
	 */
	static getCookie(cookieName) {
		// Prepare the name of the cookie to search for
		const name = cookieName + '=';
		
		// Decode the cookie string
		const decodedCookie = decodeURIComponent(document.cookie);
		
		// Split the cookie string into an array of individual cookies
		const cookieArray = decodedCookie.split(';');
		
		// Iterate through each cookie in the array
		for (let i = 0; i < cookieArray.length; i++) {
			let cookie = cookieArray[i];
			
			// Remove any leading whitespace from the cookie string
			while (cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1);
			}
			
			// Check if the cookie starts with the desired name
			if (cookie.indexOf(name) === 0) {
				// Return the value of the cookie (excluding the name)
				return cookie.substring(name.length, cookie.length);
			}
		}
		
		// Return null if the cookie was not found
		return null;
	}
	
	/**
	 * Sets a cookie with the given name and value.
	 * @param {string} cookieName - The name of the cookie.
	 * @param {string} cookieValue - The value of the cookie.
	 */
	static setCookie(cookieName, cookieValue) {
		// Create a new Date object and set it to the current date
		const expires = new Date();
		
		// Increase the year of the date object by 1
		expires.setFullYear(expires.getFullYear() + 1);
		
		// Get the UTC string representation of the date object
		const expiresString = expires.toUTCString();
		
		// Construct the cookie string with the given name, value, and expiration date
		// Set the cookie in the document
		document.cookie = `${cookieName}=${cookieValue};expires=${expiresString};path=/`;
	}
	
	/**
	 * Initializes the function.
	 */
	init() {
		// Calls the _handleCookie function with the specified parameters.
		this._handleCookie(this.cookies, this.wrapper, this.button);
	}
	
	/**
	 * Closes the panel.
	 * @param {Event} e - The event object.
	 */
	_closePanel(e) {
		e.preventDefault();
		
		// Remove the 'is-show' class from the wrapper element.
		this.wrapper.classList.remove('is-show');
		
		// Remove the wrapper element from the DOM.
		this.wrapper.remove();
		
		// Set cookie
		CookiesPanel.setCookie(this.cookies, 'true');
	}
	
	/**
	 * Shows the panel by adding the 'is-show' class to the wrapper element.
	 *
	 * @param {HTMLElement} wrapper - The wrapper element to show the panel in.
	 */
	_showPanel(wrapper) {
		// Remove the 'is-show' class from the wrapper element
		wrapper.classList.add('is-show');
	}
	
	/**
	 * Handle the cookie by checking its value and showing or hiding the panel accordingly.
	 * @param {string} cookieName - The name of the cookie to handle.
	 * @param {HTMLElement} wrapper - The wrapper element for the panel.
	 * @param {HTMLElement} button - The button element to close the panel.
	 */
	_handleCookie(cookieName, wrapper, button) {
		// Get the value of the cookie
		const cookieValue = CookiesPanel.getCookie(cookieName);
		
		// If the cookie value is not set, show the panel
		if (!cookieValue) {
			this._showPanel(wrapper);
		}
		
		// Add event listener to the button to close the panel
		button.addEventListener('click', this._closePanel.bind(this));
	}
}
