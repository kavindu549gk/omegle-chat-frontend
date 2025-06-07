
const ws = new WebSocket("wss://your-project-name.glitch.me");

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");

ws.onmessage = (event) => {
  const msg = document.createElement("div");
  msg.textContent = "Stranger: " + event.data;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
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
