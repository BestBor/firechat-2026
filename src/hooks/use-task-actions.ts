import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import {
    addDoc,
    collection,
    query,
    where,
} from "firebase/firestore"
import type { Task } from "@/schemas/task.schema"

export const useTaskActions = () => {
    const {data: user} = useUser()

    if (!user) {
        throw new Error("User not authenticated")
    }


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

    // CREATE:
    const createTask = async (data: {
        title: string,
        description?: string, 
    }) => {
        const newTask = {
            ...data,
            completed: false,
            userId: user!.uid,
        }

        return await addDoc(taskCollectionRef, newTask)
    }

    return {
        tasks: tasks as Task[],
        isLoading: status === "loading",

        createTask,
    }
}