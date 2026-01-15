import type { User } from "firebase/auth"
import { useFirestore } from "reactfire"

export const useUserActions = () => {
    const db = useFirestore()
    const createOrUpdateUser = async (user: User) => {
        if (!user) throw new Error("User Unavailable")
        
            // Reference 
    }
}