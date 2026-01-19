import { useFriendInfo } from "@/hooks/use-friend-info"


interface Props {
    friendUid: string,
}

const FriendEmail = ({friendUid}:Props) => {

    const {friend} = useFriendInfo(friendUid)

  return friend?.email || "Loading..."
}
export default FriendEmail