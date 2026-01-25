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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      {/* Left Sidebar - Rooms */}
      <section className="lg:col-span-1 flex flex-col bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground">Messages</h2>
          <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
            <FormSearchRoom handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<div className="text-sm text-muted-foreground text-center py-8">Loading conversations...</div>}>
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
      </section>

      {/* Right Panel - Chat Area */}
      <section className="lg:col-span-2 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {roomId ? (
          <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground">Loading chat...</div>}>
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <MessagesChat roomId={roomId} />
              </div>
              <div className="border-t border-border p-6 bg-muted/30">
                <FormMessageChat roomId={roomId} />
              </div>
            </div>
          </Suspense>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="space-y-3">
              <svg className="w-16 h-16 mx-auto text-muted-foreground opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-semibold text-foreground">No chat selected</h3>
              <p className="text-sm text-muted-foreground">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
export default ChatPage