const ws = new WebSocket("wss://round-speckled-sponge.glitch.me");

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
let typingTimeout;
let typingCooldown = false;

// Handle incoming messages
ws.onmessage = (event) => {
  const processMessage = (msg) => {
    if (msg === "__typing__") {
      document.getElementById("typing-indicator").textContent = "Stranger is typing...";
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        document.getElementById("typing-indicator").textContent = "";
      }, 2000);
      return; // 🛑 Don't show typing as a message
    }

    // Display normal message
    document.getElementById("typing-indicator").textContent = "";
    const msgDiv = document.createElement("div");
    msgDiv.textContent = "Stranger: " + msg;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => processMessage(reader.result);
    reader.readAsText(event.data);
  } else {
    processMessage(event.data);
  }
};

// Send typing signal (with 2 sec cooldown)
input.addEventListener("input", () => {
  if (!typingCooldown) {
    ws.send("__typing__");
    typingCooldown = true;
    setTimeout(() => {
      typingCooldown = false;
    }, 2000);
  }
});

// Send message
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
