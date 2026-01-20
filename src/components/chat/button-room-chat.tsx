import type { Room } from "@/schemas/room.schema"
import { useUser } from "reactfire"
import { Button } from "../ui/button"
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
    <Button onClick={() => handleClickRoomId(room.id)}>
        <Suspense fallback="Loading user info...">
        <FriendEmail
            friendUid={friendUid}
        />
        </Suspense>
    </Button>
  )
}
export default RoomSelector