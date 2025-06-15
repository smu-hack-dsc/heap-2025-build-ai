// YOU DO NOT NEED TO TOUCH THIS FILE

import { useState, useEffect, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { Callout } from "@radix-ui/themes"
import UserInput from "../components/UserInput"
import { slideInFromTop } from "../utils/motion"
import UserText from "../components/conversation/userText"
import GeminiText from "../components/conversation/geminiText"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { geminiChatCompletion } from "../utils/gemini-chat"

const Chat = () => {
  const [chatHistory, setChatHistory] = useState([])
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)

  const handleSendMessage = async (userMessage) => {
    const userMessageObj = {
      role: "user",
      parts: [{ text: userMessage }],
    };
    setChatHistory((prev) => [...prev, userMessageObj])
    setError(null)

    const res = await geminiChatCompletion(userMessage)
    if (res) {
      const aiMessageObj = {
        role: "model",
        parts: [{ text: res.reply }],
      };
      setChatHistory((prev) => [...prev, aiMessageObj]);
    } else {
      setError("Unable to connect to api. Please try again.")
      setTimeout(() => {
        setError(null);
      }, 3000);
    }   
  }

  // Auto scroll to bottom whenever chatHistory updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  return (
    <div className="chat-width mx-auto p-4 pb-[180px]">
      {/* Render chat history */}
      <div className="space-y-4">
        {chatHistory.map((msg, index) => (
          msg.role === "user" ? (
            <UserText key={index} parts={msg.parts} />
          ) : (
            <GeminiText  key={index} parts={msg.parts} />
          )))}
          <div ref={bottomRef} />
      </div>

      {/* Render callout if there's an error */}
      {error && (
        <motion.div variants={slideInFromTop} initial="hidden" animate="visible">
          <Callout.Root color="red" className="my-4">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        </motion.div>        
      )}

      <UserInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat