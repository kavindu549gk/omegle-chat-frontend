
const ws = new WebSocket("wss://round-speckled-sponge.glitch.me");

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");

//ws.onmessage = (event) => {
//  const msg = document.createElement("div");
//  msg.textContent = "Stranger: " + event.data;
//  chatBox.appendChild(msg);
//  chatBox.scrollTop = chatBox.scrollHeight;
//};
ws.onmessage = (event) => {
  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const msg = reader.result;
      // Now msg is a string, handle the message here
      console.log("Received:", msg);
      // Add your message displaying logic here
    };
    reader.readAsText(event.data);
  } else {
    // If it's already a string
    const msg = event.data;
    console.log("Received:", msg);
    // Add your message displaying logic here
  }
};

function sendMessage() {
  const msg = input.value;
  if (msg.trim() !== "") {
    ws.send(msg);
    const msgDiv = document.createElement("div");
    msgDiv.textContent = "You: " + msg;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
  }
}
