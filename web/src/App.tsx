import { createSignal } from "solid-js";

export default function App() {
  const [payload, setPayload] = createSignal('');

  const handlePayloadSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    (globalThis.window as any).sendPayload(payload());
    setPayload('');
  }

  return (
    <>
      <pre>{JSON.stringify(payload())}</pre>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
        <label>Payload Id:</label>
        <input onChange={(e) => { setPayload(e.target.value) }} value={payload()} placeholder="Payload" />
        <button onClick={handlePayloadSubmit}>Send Payload</button>
      </div>
    </>
  )
}