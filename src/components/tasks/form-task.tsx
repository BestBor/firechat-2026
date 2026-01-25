import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { useTaskActions } from "@/hooks/use-task-actions"
import { toast } from "sonner"

const FormTask = () => {

    const [isPending, startTransition] = useTransition()

    const {createTask} = useTaskActions()

    const form = useForm<TaskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

  function onSubmit(values: TaskZodSchemaType) {
    startTransition(async() => {
        try {
            await createTask(values)
            form.reset()
            toast.success("Task created!")
        } catch (error) {
            console.error("Error creating task:", error)
            toast.error("Failed to create task")
        }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel className="text-foreground font-semibold">Task Title</FormLabel>
                      <FormControl>
                          <Input 
                            placeholder="What do you need to remember?" 
                            className="rounded-lg border-border bg-background focus:bg-muted transition-colors"
                            disabled={isPending}
                            {...field} 
                          />
                      </FormControl>
                      <FormMessage className="text-xs" />
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel className="text-foreground font-semibold">Description</FormLabel>
                      <FormControl>
                          <Input 
                            placeholder="Add more details..." 
                            className="rounded-lg border-border bg-background focus:bg-muted transition-colors"
                            disabled={isPending}
                            {...field} 
                          />
                      </FormControl>
                      <FormMessage className="text-xs" />
                  </FormItem>
              )}
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all font-semibold active:scale-95 disabled:opacity-50 text-sm sm:text-base"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </>
          )}
        </button>
      </form>
    </Form>
  )
}
export default FormTask