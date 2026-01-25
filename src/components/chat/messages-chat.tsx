import { useMessagesActions } from "@/hooks/use-messages-actions"
import MessageChat from "./message-chat"
import { useEffect, useRef } from "react"

interface Props {
    roomId: string,
}

const MessagesChat = ({roomId}:Props) => {
  const {messages} = useMessagesActions(roomId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="space-y-2">
      {
        messages.map((msg) => (
          <MessageChat key={msg.id} message={msg} />
        ))
      }
      <div ref={messagesEndRef} />
    </div>
  )
}
export default MessagesChat