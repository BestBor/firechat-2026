import { useMessagesActions } from "@/hooks/use-messages-actions"
import MessageChat from "./message-chat"

interface Props {
    roomId: string,
}

const MessagesChat = ({roomId}:Props) => {
  const {messages} = useMessagesActions(roomId)

  return (
    <div className="space-y-2">
      {
        messages.map((msg) => (
          <MessageChat key={msg.id} message={msg} />
        ))
      }
    </div>
    // <pre>{JSON.stringify(messages, null, 2)}</pre>
  )
}
export default MessagesChat