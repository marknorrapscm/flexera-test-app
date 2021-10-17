export default () => {
	return randomString(10);
};

/**
 * Adapted from:
 * https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
 */
const randomString = len => {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";

	for (let i = len; i > 0; i -= 1) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}

	return result;
};