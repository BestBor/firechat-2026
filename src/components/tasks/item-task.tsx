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
            toast.success("Task deleted")
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
            toast.success(task.completed ? "Task reopened" : "Task completed!")
        } catch (error) {
            console.log(error)
            toast.error("Error updating task completion")
        }
    })
  }

  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-in fade-in-50 slide-in-from-bottom-2">
      <CardHeader>
        <CardTitle className={cn(
          "text-lg font-semibold", 
          task.completed && "line-through text-muted-foreground opacity-60"
        )}>
          {task.title}
        </CardTitle>
        <CardAction className="space-x-2">
          <Button 
            variant={"outline"} 
            onClick={handleUpdate} 
            disabled={isPending}
            size="sm"
            className="text-xs sm:text-sm"
          >
            {task.completed ? "Reopen" : "Done"}
          </Button>
          <Button 
            variant={"destructive"} 
            onClick={handleDelete} 
            disabled={isPending}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Delete
          </Button>
        </CardAction>
      </CardHeader>
      {task.description && (
        <CardContent className="text-sm text-muted-foreground">
          {task.description}
        </CardContent>
      )}
    </Card>
  );
};
export default ItemTask;
