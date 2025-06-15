// YOU DO NOT NEED TO TOUCH THIS FILE

import 'flowtoken/dist/styles.css'
import { AnimatedMarkdown } from 'flowtoken'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const GeminiText = ({ parts }) => {
 
  return (
    <div className="flex justify-start">
      <div className="chat-container-gemini prose dark:prose-invert max-w-none">
        <AnimatedMarkdown // Custom styling is applied in App.css
          content={parts[0].text}
          animation="fadeIn"
          animationDuration="0.5s"
          animationTimingFunction="ease-in-out"
          codeStyle={oneDark}
        />
      </div>
    </div>
  )
}

export default GeminiText