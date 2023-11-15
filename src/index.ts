import * as carlo from 'carlo';
import {resolve} from 'path';
import {Server, WebSocket} from 'ws';
import fs from 'fs/promises';

const wss = new Server({ port: 5656 });

let app: carlo.App;
let clientWs: WebSocket;

(async () => {
	/* Start the carlo instance. */
	app = await carlo.launch();
	app.on('exit', () => process.exit());
	app.serveFolder(resolve(process.cwd(), 'web/dist'));

	app.exposeFunction('sendPayload', async (retval: string) => {
		const [payloadId] = JSON.parse(retval).args;
		if (payloadId !== '' && clientWs != undefined) {
			const payload = await fs.readFile(`./payloads/${payloadId}.js`, 'utf-8');
			console.log(`sending '${payloadId}' payload to websocket client`)
			clientWs.send(payload);
		}
	});
	await app.load(`http://localhost:5173`);
})();

wss.on('connection', async (ws: WebSocket) => {
	console.log('a websocket has connected to the server')
	clientWs = ws;

	ws.on('message', (e) => {
		const data = JSON.parse(e.toString());
		if (!data.ok && data.error) {
			console.log(`there was an error while executing previous payload!, error: ${data.error}`);
			return;
		}
	});

	const payload = await fs.readFile('./payloads/log.js', 'utf-8');
	setTimeout(() => {
		ws.send(payload);
	}, 3500);
});