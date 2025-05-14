import JustValidate from 'just-validate';
import Notify       from 'simple-notify';

// Default settings for validation
const defaultSettings = {
	errorFieldStyle          : false,
	errorFieldCssClass       : 'is-error',
	errorLabelCssClass       : 'is-error',
	focusInvalidField        : true,
	lockForm                 : true,
	validateBeforeSubmitting : true,
	errorLabelStyle          : { color : '' },
};

/**
 * Validates form fields based on the provided rules.
 * @param {Object} options - The validation options.
 * @param {HTMLElement|Element} options.form - The form element to validate.
 * @param {string} [options.item='[data-form-validation="required"]'] - The selector for the form elements to validate.
 * @param {Object} config - Additional configuration options for validation.
 * @returns {JustValidate|boolean} - The JustValidate instance.
 */
export default function validateRules({
	form,
	item = '[data-form-validation="required"]',
}, config) {
	if (!form) return false;
	
	const button   = form.querySelector('button[type="submit"]');
	const validate = new JustValidate(form, { ...defaultSettings, ...config });
	
	form.querySelectorAll(item).forEach((el) => {
		const rulesAttribute = el.getAttribute('data-form-validation-rules');
		if (!rulesAttribute) return;
		
		try {
			const rulesObject = JSON.parse(rulesAttribute);
			validate.addField(el, rulesObject);
		} catch (error) {
			// Log error if JSON parsing fails
			// eslint-disable-next-line no-console
			console.info('Invalid JSON string:', error);
		}
	});
	
	// Add loading state on form submission
	form.addEventListener('ajax:promise', () => {
		button.classList.add('is-loading');
	});
	
	// Remove loading state on failed submission
	form.addEventListener('ajax:fail', () => {
		button.classList.remove('is-loading');
	});
	
	// Reset form and show success notification on successful submission
	form.addEventListener('ajax:done', (e) => {
		const { target } = e;
		target.reset();
		
		// Show success notification
		// eslint-disable-next-line no-new
		new Notify({
			status          : 'success',
			title           : 'Your form was successfully submitted',
			effect          : 'fade',
			speed           : 300,
			showIcon        : true,
			showCloseButton : true,
			autoclose       : true,
			autotimeout     : 3000,
			gap             : 20,
			distance        : 20,
			type            : 1,
			position        : 'right top',
		});
		
		button.classList.remove('is-loading');
		button.setAttribute('disabled', '');
	});
	
	// Enable or disable submit button based on form validity
	function changeStatusSubmitButton() {
		if (validate.isValid) {
			button.removeAttribute('disabled');
		} else {
			button.setAttribute('disabled', '');
		}
	}
	
	// Validate form on blur event
	form.addEventListener('blur', (e) => {
		if (e.target.matches(item)) {
			changeStatusSubmitButton();
		}
	});
	
	// Validate form on keyup event
	form.addEventListener('keyup', (e) => {
		if (e.target.matches(item)) {
			changeStatusSubmitButton();
		}
	});
	
	return validate;
}
