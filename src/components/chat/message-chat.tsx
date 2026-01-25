import type { Message } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  message: Message;
}

const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();
  const isFriend = user?.uid !== message.senderId;

  return (
    <div
      className={cn(
        "flex gap-3 animate-in fade-in-50 slide-in-from-bottom-2",
        isFriend ? "justify-start" : "justify-end",
      )}
    >
      <div
        className={cn(
          "max-w-sm px-4 py-2.5 rounded-2xl shadow-sm border",
          isFriend
            ? "bg-muted text-foreground border-border"
            : "bg-primary text-primary-foreground border-primary",
        )}
      >
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        <p
          className={cn(
            "truncate text-xs mt-1.5 opacity-70 font-medium",
            isFriend ? "text-muted-foreground" : "text-primary-foreground/80",
          )}
        >
          {isFriend ? (
            <Suspense fallback="...">
              <FriendEmail friendUid={message.senderId} />
            </Suspense>
          ) : (
            user.email
          )}
        </p>
      </div>
    </div>
  );
};
export default MessageChat;
