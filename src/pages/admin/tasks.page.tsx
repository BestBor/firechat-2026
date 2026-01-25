import FormTask from "@/components/tasks/form-task"
import ListTask from "@/components/tasks/list-task"
import { Suspense } from "react"

const TasksPage = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">My Tasks</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Keep track of things you don't want to forget</p>
        </div>

        {/* Create Task Form */}
        <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <FormTask />
        </div>

        {/* Tasks List */}
        <div>
          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading tasks...</div>
            </div>
          }>
            <ListTask />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
export default TasksPage