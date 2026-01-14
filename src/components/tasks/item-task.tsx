import { useTaskActions } from "@/hooks/use-task-actions";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

import type { Task } from "@/schemas/task.schema";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const ItemTask = ({ task }: Props) => {
  const { deleteTask, updateTask } = useTaskActions()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async() => {
        try {
            await deleteTask(task.id)
        } catch (error) {
            console.log(error)
            toast.error("Error deleting task")
        }
    })
  }

  const handleUpdate = async () => {
    startTransition(async() => {
        try {
            await updateTask(task.id)
        } catch (error) {
            console.log(error)
            toast.error("Error updating task completion")
        }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={
            cn(
                "text-lg font-semibold", task.completed ? "line-through text-gray-500" : ""
            )
        }>{task.title}</CardTitle>
        <CardAction className="space-x-2">
          <Button variant={"outline"} onClick={handleUpdate} disabled={isPending}>Update</Button>
          <Button variant={"destructive"} onClick={handleDelete} disabled={isPending}>Delete</Button>
        </CardAction>
        <CardContent>
            {task.description}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
export default ItemTask;
