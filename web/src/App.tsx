import { createSignal, onMount } from "solid-js";

export default function App() {
  const [payload, setPayload] = createSignal('');
  onMount(() => {})

  function handlePayloadSubmit(e: MouseEvent) {
    e.preventDefault();
    (window as any).sendPayload(payload())
    setPayload('')
  }

  return (
    <>
      <div class="flex m-2 flex-col">
        <span>{JSON.stringify(payload())}</span>
        <div class="my-4">
          <input placeholder="Payload Id" value={payload()} onChange={(e) => setPayload(e.target.value)} />
          <button class="mx-2" onClick={handlePayloadSubmit}>Send Payload</button>
        </div>
      </div>
    </>
  )
}