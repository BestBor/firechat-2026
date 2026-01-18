import type { UserFirestore } from "@/schemas/user.schema"
import type { User } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useFirestore } from "reactfire"

export const useUserActions = () => {
    const db = useFirestore()
    const createOrUpdateUser = async (user: User) => {
        if (!user) throw new Error("User Unavailable")
        
        // Reference 
        const userDocRef = doc(db, "users", user.uid)

        // User data to store in firestore
        const userData: UserFirestore = {
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            photoUrl: user.photoURL || "",
        }

        // Create or update document (merge save)
        return await setDoc(userDocRef, userData, {
            merge: true,
        })
    }

    return {
        createOrUpdateUser
    }
}