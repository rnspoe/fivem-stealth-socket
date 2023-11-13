(async () => {
	const iframes = document.querySelectorAll('iframe');

	iframes.forEach((value) => {
		console.log(`Detected Iframe: ${value.name}`);

	})
})();