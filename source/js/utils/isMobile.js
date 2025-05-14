/**
 * Checks if the current user agent is a mobile device.
 *
 * @return {boolean} Returns true if the user agent is a mobile device, false otherwise.
 */
export default function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent);
}
