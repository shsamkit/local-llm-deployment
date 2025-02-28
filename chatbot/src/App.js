import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post("http://100.78.135.57:8081/v1/chat/completions", {
        "model": "Llama 3 8B Instruct",
        "messages": [{ role: "user", content: input }],
        "max_tokens": 5000,
        "temperature": 0.28
      });
      const botReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { role: "bot", content: botReply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "bot", content: "Error fetching response" }]);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Chatbot</h2>
      <div style={styles.chatBox} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.role === "user" ? styles.userMessage : styles.botMessage}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>
            <div style={{ whiteSpace: "pre-line" }}>{msg.content}</div> {/* Preserves newlines */}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="content"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  chatBox: {
    border: "1px solid #ccc",
    padding: "10px",
    height: "650px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  userMessage: {
    contentAlign: "right",
    backgroundColor: "#daf8cb",
    padding: "8px",
    borderRadius: "10px",
    alignSelf: "flex-end",
  },
  botMessage: {
    contentAlign: "left",
    backgroundColor: "#f1f1f1",
    padding: "8px",
    borderRadius: "10px",
    alignSelf: "flex-start",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "5px",
  },
  button: {
    padding: "5px 10px",
    marginLeft: "5px",
  },
};

export default App;
