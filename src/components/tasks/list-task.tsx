import { useTaskActions } from "@/hooks/use-task-actions";
import ItemTask from "./item-task";

const ListTask = () => {
  const { tasks } = useTaskActions();

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-16 h-16 text-muted-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-lg font-semibold text-foreground mb-1">No tasks yet</h3>
        <p className="text-sm text-muted-foreground">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        tasks.map((task) => (
          <ItemTask key={task.id} task={task} />
        ))
      }
    </div>
  );
};
export default ListTask;
