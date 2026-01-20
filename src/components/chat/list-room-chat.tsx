import { useRoomActions } from "@/hooks/use-room-actions";
import RoomSelector from "./button-room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = useRoomActions();

  return (
    <pre>
      {rooms.map((room) => (
        <RoomSelector
            key={room.id}
            room={room}
            handleClickRoomId={handleClickRoomId}
        />
      ))}
      {/* {JSON.stringify(rooms, null, 2)} */}
    </pre>
  );
};
export default ListRoomChat;
