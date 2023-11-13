(async () => {
	if (!'WebSocket' in window) {
		console.log(`[WARNING]\tSockets are not supported!`);
		return;
	}

	let sWs = new WebSocket(`ws://localhost:3000`);
	sWs.onmessage = async (e) => {
		if (e.data && typeof(e.data) == 'string') {
			try {
				await eval(e.data);
				sWs.send(JSON.stringify({ ok: true }));
			} catch (error) {
				sWs.send(JSON.stringify({ ok: false, error }));
			}

		}
	}
})();