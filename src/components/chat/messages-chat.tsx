import { useMessagesActions } from "@/hooks/use-messages-actions"

interface Props {
    roomId: string,
}

const MessagesChat = ({roomId}:Props) => {

    const {messages} = useMessagesActions(roomId)

  return (
    <pre>
        {JSON.stringify(messages, null, 2)}
    </pre>
  )
}
export default MessagesChat