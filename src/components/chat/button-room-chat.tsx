import type { Room } from "@/schemas/room.schema"
import { useUser } from "reactfire"
import FriendEmail from "./friend-email"
import { Suspense } from "react"


interface Props {
    room: Room,
    handleClickRoomId: (id: string) => void
}

const RoomSelector = ({room, handleClickRoomId}:Props) => {

    const {data: user} = useUser()
    const friendUid = room.participants.find((id) => id !== user?.uid) || ""


  return (
    <button
      onClick={() => handleClickRoomId(room.id)}
      className="w-full text-left px-4 py-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200 border border-transparent hover:border-border group active:scale-95"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 font-medium text-foreground">
          <Suspense fallback={<div className="text-xs text-muted-foreground">Loading...</div>}>
            <FriendEmail friendUid={friendUid} />
          </Suspense>
        </div>
        <div className="w-2 h-2 rounded-full bg-primary ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  )
}
export default RoomSelector