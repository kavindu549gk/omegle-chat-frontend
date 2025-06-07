
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
      console.log("Received:", msg);
      
      // Append message to chat box here
      const msgDiv = document.createElement("div");
      msgDiv.textContent = "Stranger: " + msg;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    };
    reader.readAsText(event.data);
  } else {
    const msg = event.data;
    console.log("Received:", msg);
    
    // Append message to chat box here
    const msgDiv = document.createElement("div");
    msgDiv.textContent = "Stranger: " + msg;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
};


let typingTimeout;

input.addEventListener("input", () => {
  ws.send("__typing__");
});







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
