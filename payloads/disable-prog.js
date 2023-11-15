let sock_progDisabled = true;

async function fetchNui(eventName, data) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : 'nui-frame-app';

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  const respFormatted = await resp.json()
  return respFormatted
}

window.addEventListener('message', async (e) => {
	const { action, data } = e.data;
	if (action == "setVisible" && data) {
		await new Promise((resolve) => setTimeout(resolve, 350));

		// close this bitch
		window.dispatchEvent(
			new MessageEvent('message', {
				data: {
					action: 'setVisible',
					data: false,
				},
			}),
		);

		// end the prog bar
		fetchNui('finished', {})
	}
})