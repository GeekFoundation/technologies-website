import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

/**
 * Represents the main menu of the website.
 */

export default class MainMenu {
    #openStatus = false;

    /**
     * Initializes the main menu.
     *
     * @param {Object} options - The options for the main menu.
     * @param {string} options.container - The selector for the main menu container.
     * @param {string} options.trigger - The selector for the main menu trigger.
     * @param {string} options.menu - The selector for the main menu.
     * @param {string} options.openClass - The CSS class for when the main menu is open.
     * @param {string} options.animationClass - The CSS class for when the main menu is animating.
     * @param {string} options.bodyClass - The CSS class for when the body is overflowing.
     * @param {function} options.onOpen - The callback for when the main menu is opened.
     * @param {function} options.onClose - The callback for when the main menu is closed.
     */

    constructor({
        container = '[data-main-menu="wrapper"]',
        trigger = '[data-main-menu="trigger"]',
        menu = '[data-main-menu="menu"]',
        close = '[data-main-menu="close"]',
        openClass = 'is-open',
        animationClass = 'is-animation',
        bodyClass = 'is-body-scroll-disabled',
        onOpen = () => {
        },
        onClose = () => {
        }
    } = {}) {
        this.trigger         = document.querySelector(trigger);
        this.container       = document.querySelector(container);
        this.menu            = document.querySelector(menu);
        this.closeButtons    = document.querySelectorAll(close);
        this.openClass       = openClass;
        this.animationClass  = animationClass;
        this.bodyClass       = bodyClass;
        this.onOpen          = onOpen;
        this.onClose         = onClose;
        this.boundToggleMenu = this._toggleMenu.bind(this);

        if (!this.container || !this.trigger || !this.menu) {
            console.error('One or more required elements are missing.');
            return;
        }

        if (this.closeButtons) {
            this.closeButtons.forEach((button) => {
                if (button) {
                    button.addEventListener('click', this._close.bind(this));
                }
            });
        }
    }

    /**
     * Get the open status of a business
     * @returns {boolean} - Whether the business is open or not
     */
    get openStatus() {
        return this.#openStatus;
    }

    /**
     * Initializes the event listener for the trigger element.
     * If there is no trigger or container, do nothing.
     * Bind the click event to the _click method.
     * @returns {void}
     */
    init() {
        this.trigger.removeEventListener('click', this.boundToggleMenu);
        this.trigger.addEventListener('click', this.boundToggleMenu);
    }

    /**
     * Toggles the main menu open or closed.
     *
     * @returns {void}
     */
    _toggleMenu() {
        if (this.#openStatus) {
            this._close();
        } else {
            this._open();
        }
    }

    /**
     * Sets open status to true and applies open-related classes and animations to the menu and body.
     */
    _open() {
        // Set open status to true
        this.#openStatus = true;

        // Destructure options object
        const {
                  onOpen,
                  openClass,
                  bodyClass,
                  animationClass
              } = this;

        onOpen();

        this.trigger.classList.add(openClass);
        document.body.classList.add(bodyClass);

        this.container.classList.add(openClass, animationClass);
        try {
            disableBodyScroll(this.container);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Ошибка при отключении прокрутки:', error);
        }
        // Add animationClass to menu after delay
        requestAnimationFrame(() => {
            this.menu.classList.add(animationClass);
        });
    }

    /**
     * Closes the menu and resets its state.
     * @returns {void}
     */
    _close() {
        // Destructure properties from 'this'
        const {
                  menu,
                  container,
                  trigger,
                  animationClass,
                  openClass
              } = this;

        // Remove animation and open classes from menu and container
        menu.classList.remove(animationClass);

        // Check if the container is still animating
        if (!container.classList.contains(animationClass)) {
            // If not, reset the state immediately
            this._resetState();
            return;
        }
        container.classList.remove(animationClass);

        // Remove open class from trigger
        trigger.classList.remove(openClass);

        // Define a function to reset the state when the animation ends
        const resetState = () => {
            // Reset the state
            this._resetState();

            // Remove the event listener
            container.removeEventListener('animationend', resetState);
        };

        // Listen for animation end event on container
        container.addEventListener('animationend', resetState, {once:true});
    }

    _resetState() {
        const {
                  container,
                  bodyClass,
                  openClass,
                  onClose
              } = this;

        document.body.classList.remove(bodyClass);
        enableBodyScroll(container);
        container.classList.remove(openClass);
        onClose();
        this.#openStatus = false;
    }

    /**
     * Closes the main menu.
     */
    closeMainMenu() {
        this._close();
    }
}
