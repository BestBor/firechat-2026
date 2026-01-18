import { useRoomActions } from "@/hooks/use-room-actions"
import { Button } from "../ui/button"

interface Props {
    handleClickRoomId: (id: string) => void, 
}

const ListRoomChat = ({handleClickRoomId}: Props) => {

    const {rooms} = useRoomActions()

  return (
    <pre>
        {rooms.map((room) => (
            <Button
                key={room.id}
                onClick={() => handleClickRoomId(room.id)}
            >
                {room.id}
            </Button>
        ))}
        {JSON.stringify(rooms, null, 2)}
    </pre>
  )
}
export default ListRoomChat