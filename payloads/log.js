(async () => {
	const iframes = document.querySelectorAll('iframe');

	iframes.forEach(value => {
		if (value.name == 'erp_progressbar') {
			let fetchScript = value.contentDocument.createElement('script');
			fetchScript.type = 'text/javascript';
			fetchScript.innerHTML = `async function completeProgbar() { const opts = { method: 'post', headers: {'Content-Type': 'application/json; charset=UTF-8', }, body: JSON.stringify('')}; await fetch('https://erp_progressbar/finished', opts);}`;
			value.contentDocument.getElementsByTagName('head')[0].appendChild(fetchScript);

			value.contentWindow.addEventListener('message', async (e) => {
				const { action, data } = e.data;
				if (action == "setVisible" && data) {
					await new Promise((resolve) => setTimeout(resolve, 350));

					// close this bitch
					value.contentWindow.dispatchEvent(
						new MessageEvent('message', {
							data: {
								action: 'setVisible',
								data: false,
							},
						}),
					);

					// end the prog bar
					value.contentWindow.completeProgbar()
				}
			})
		}
	})
})();