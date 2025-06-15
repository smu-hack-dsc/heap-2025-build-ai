// YOU DO NOT NEED TO TOUCH THIS FILE

import { useState, useRef } from "react"

const UserInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")
  const textAreaRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== "") {
        console.log("Send message:", message)
        onSendMessage(message);
        setMessage(""); 
        textAreaRef.current.style.height = "auto" 
      }
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value)
    const ta = textAreaRef.current
    ta.style.height = "auto" 
    ta.style.height = `${ta.scrollHeight}px`
  };

  return (
    <div className="chat-input-container">
      <textarea
        ref={textAreaRef}
        placeholder="Ask anything"
        className="chat-input"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default UserInput
