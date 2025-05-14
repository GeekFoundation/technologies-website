/**
 * Represents a class for creating YouTube video player.
 */
export default class GetYoutubeVideo {
	/**
     * Constructor for GetYoutubeVideo class.
     * @param {Object} options - An object containing options to customize the video player.
     * @param {Element} options.el - The DOM element where the video player should be created.
     * @param {Function} options.onInit - A callback function to be executed when the video player is initialized.
     * @param {Function} options.onAdd - A callback function to be executed when the video player is added to the DOM.
     */
	constructor({
		el = document.querySelector('[data-embed-youtube]'),
		onInit = () => {
		},
		onAdd = () => {
		},
	} = {}) {
		this.wrapper = el;
		this.id      = this._getId();

		this.options = {
			onInit,
			onAdd,
		};

		this._init();
	}

	/**
 * Extracts the YouTube video ID from the URL in the data attribute of the wrapper element.
 *
 * @returns {string|false} The YouTube video ID if found, false otherwise.
 */
	_getId() {
		const { dataset } = this.wrapper;

		// Check if dataset or dataset.url is undefined
		if (!dataset || !dataset.url) {
			console.error('Video URL not found', this.wrapper);
			return false;
		}

		// Regex to match YouTube URLs
		const youtubeUrlRegex =    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

		// Match the URL with the regex and return the ID
		const match = dataset.url.match(youtubeUrlRegex);
		return match ? match[1] : false;
	}

	/**
	* Initializes the widget.
	*
	* @returns {void}
	*/
	_init() {
		// Destructure object properties for better readability
		const { wrapper, id, options } = this;

		// Check if the required variables are defined
		if (!wrapper || !id) {
			return;
		}

		// If no placeholder image is found, create a thumbnail
		const placeholder = wrapper.querySelector('img');
		if (!placeholder) {
			wrapper.innerHTML = this._createThumbnail();
		}

		// Add click event listener to create iframe
		wrapper.addEventListener('click', this._createIframe.bind(this));

		// Call onInit method from options object
		options.onInit();
	}

	/**
	* Removes the picture or image element from the player's wrapper and adds a loading class to it.
	* @returns {void}
	*/
	_clearWrapper() {
		const picture = this.wrapper.querySelector('picture');
		const image = this.wrapper.querySelector('img');

		if (picture) {
			picture.remove();
		} else if (image) {
			image.remove();
		}

		this.wrapper.classList.add('is-loading');
	}

	/**
	* Create and load YouTube video iframe in container
	* @param {Event} e - The event object
	*/
	_createIframe(e) {
		// Prevent default action
		e.preventDefault();

		// Create iframe element
		const iframe = document.createElement('iframe');

		// Set attributes for iframe
		iframe.setAttribute(
			'src',
			'//www.youtube.com/embed/'
		+ `${this.id}?autoplay=1&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&playsinline=1&rel=0`,
		);
		iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
		iframe.setAttribute('frameborder', '0');

		// Replace wrapper's first child with iframe
		this.wrapper.firstChild.replaceWith(iframe);

		// Clear wrapper contents
		this._clearWrapper();

		// Call onAdd callback
		this.options.onAdd();
	}

	/**
	* Returns a picture element with the default max resolution thumbnail of a YouTube video.
	* @returns {string} A string representing the HTML of the picture element.
	*/
	_createThumbnail() {
		const { id } = this;
		const webpSrc = `//i.ytimg.com/vi_webp/${id}/maxresdefault.webp`;
		const jpgSrc = `//i.ytimg.com/vi_webp/${id}/maxresdefault.jpg`;
		return `
			<picture>
			<source srcset="${webpSrc}" type="image/webp">
			<source srcset="${jpgSrc}" type="image/jpg">
			<img class="youtube-thumbnail" src="${jpgSrc}" alt="">
			</picture>
		`;
	}
}
