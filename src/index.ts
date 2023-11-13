import * as carlo from 'carlo';
import {resolve} from 'path';

let app: carlo.App;

(async () => {
	/* Start the carlo instance. */
	app = await carlo.launch();
	app.on('exit', () => process.exit());
	app.serveFolder(resolve(process.cwd(), 'web/dist'));

	await app.load(`http://localhost:5173`);
})();