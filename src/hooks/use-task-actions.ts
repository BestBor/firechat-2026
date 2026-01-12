import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import {
    collection,
    query,
    where,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore"
import type { Task } from "@/schemas/task.schema"

export const useTaskActions = () => {
    const {data: user} = useUser()
    const db = useFirestore()

    const taskCollectionRef = collection(db, "tasks")

    const tasksQuery = query(
        taskCollectionRef,
        where("userId", "==", user!.uid)
    )

    const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
        idField: "id",
        suspense: true
    })

    return {
        tasks: tasks as Task[],
    }
}