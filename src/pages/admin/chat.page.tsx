import FormMessageChat from "@/components/chat/form-message-chat"
import FormSearchRoom from "@/components/chat/form-search-room"
import ListRoomChat from "@/components/chat/list-room-chat"
import MessagesChat from "@/components/chat/messages-chat"
import { Suspense, useState } from "react"

const ChatPage = () => {

  const [roomId, setRoomId] = useState("")

  const handleClickRoomId = (id: string) => {
    setRoomId(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="space-y-4">
        {/* {Show rooms} */}
        <Suspense fallback={<div>Loading rooms...</div>}>
          <FormSearchRoom handleClickRoomId={handleClickRoomId} />
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