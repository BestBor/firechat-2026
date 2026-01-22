import type { Room } from "@/schemas/room.schema"
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useRoomActions = () => {
    const db = useFirestore()
    const {data: user} = useUser()
    
    const roomRef = collection(db, "rooms")

    const roomQuery = query(
        roomRef,
        where("participants", "array-contains", user!.uid)
    )

    const {data: rooms} = useFirestoreCollectionData(roomQuery, {
        suspense: true,
        idField: "id",
    })

    const searchUserWithEmail = async (email: string) => {
        const userRef = collection(db, "users")

        const userQuery = query(userRef, where(
            "email", "==", email
        ))

        const querySnapshot = await getDocs(userQuery)
        if (querySnapshot.empty) return null
        const doc = querySnapshot.docs[0]

        return doc.data()
    }

    const findOrCreateRoom = async(friendEmail: string) => {
        if (!user) return {
            success: false,
            message: "401: Not authorized",
            roomId: null
        }

        if (user.email === friendEmail) return {
            success: false,
            message: "400: Error, cannot search active user",
            roomId: null
        }
        
        const friend = await searchUserWithEmail(friendEmail)
        if(!friend) return {
            success: false,
            message: "404: Contact / friend, not found",
            roomId: null
        }

        const existRoom = rooms.find(room => (
            room.participants.find((uid:string) => uid === friend.uid)
        ))
        
        if (existRoom) return {
            success: true,
            message: "200, Room found",
            roomId: existRoom.id
        }

        const newRoom: Omit<Room, "id"> = {
            createdAt: serverTimestamp(),
            lastMessage: null,
            participants: [friend.uid, user.uid]
        }

        const docRef = await addDoc(roomRef, newRoom)

        return {
            success: true,
            message: "200, Room created",
            roomId: docRef.id
        }

    }

    return {
        rooms: rooms as Room[],
        findOrCreateRoom
    }
}