import FormMessageChat from "@/components/chat/form-message-chat"
import ListRoomChat from "@/components/chat/list-room-chat"
import MessagesChat from "@/components/chat/messages-chat"
import { Suspense, useState } from "react"

const ChatPage = () => {

  const [roomId, setRoomId] = useState("")

  const handleClickRoomId = (id: string) => {
    setRoomId(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <section>
        {/* {Show rooms} */}
        <Suspense fallback={<div>Loading rooms...</div>}>
          <ListRoomChat handleClickRoomId={handleClickRoomId} />
        </Suspense>
      </section>
      <section>
        {/* {Show Messages} */}
        {
          roomId ? (
            <Suspense fallback={<div>Loading Messages...</div>}>
              <FormMessageChat roomId={roomId} />
              <MessagesChat roomId={roomId} />
            </Suspense>
          ) : (
            <div>
              Select a room to chat
            </div>
          )
        }
      </section>
    </div>
  )
}
export default ChatPage