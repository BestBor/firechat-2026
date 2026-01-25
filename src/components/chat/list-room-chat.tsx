import { useRoomActions } from "@/hooks/use-room-actions";
import RoomSelector from "./button-room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = useRoomActions();

  return (
    <div className="space-y-2">
      {rooms.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No conversations yet</p>
      ) : (
        rooms.map((room) => (
          <RoomSelector
            key={room.id}
            room={room}
            handleClickRoomId={handleClickRoomId}
          />
        ))
      )}
    </div>
  );
};
export default ListRoomChat;
