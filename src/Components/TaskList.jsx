import React, { useRef } from 'react';
import TaskCard from './TaskCard';


function TaskList({ tasks, setTasks }) {

  // Handle double click to change task status
  const handleClick = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Cycle status: todo → inProgress → done → todo
        const nextStatus =
          task.status === "todo"
            ? "inProgress"
            : task.status === "inProgress"
              ? "done"
              : "todo";
        return { ...task, status: nextStatus, isComplete: nextStatus === 'done' };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Ref to store the id of the dragged task
  const draggedTaskId = useRef(null);
  // Called when user starts dragging a task
  const handleDragStart = (id) => {
    draggedTaskId.current = id;
  };
  // Called when a task is dropped into a column
  const handleDrop = (newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === draggedTaskId.current ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Delete Task
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Sort by priority: High > Medium > Low
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedTasks = [...tasks].sort((a, b) => {
    const pA = priorityOrder[a.priority] ?? 4;
    const pB = priorityOrder[b.priority] ?? 4;
    return pA - pB;
  });

  // Filter tasks by status for each column
  const todoTasks = sortedTasks.filter((t) => t.status === 'todo');
  const progressTasks = sortedTasks.filter((t) => t.status === 'inProgress');
  const doneTasks = sortedTasks.filter((t) => t.status === 'done');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-slate-200 lg:border-t-0">
      {/* Column 1: To Do */}
      <div
        className="py-6 lg:pr-8 lg:py-0"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop('todo')}
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span> To Do
          </h3>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-lg">
            {todoTasks.length}
          </span>
        </div>
        <div className="space-y-4">
          {todoTasks.length > 0 ? (
            todoTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                date={new Date(task.createdAt).toLocaleDateString()}
                isComplete={task.isComplete}
                onDelete={handleDelete}
                onDragStart={() => handleDragStart(task.id)}
                draggable
                handleClick={handleClick}
              />
            ))
          ) : (
            <p className="text-slate-400 text-sm text-center py-10">No tasks found</p>
          )}
        </div>
      </div>
      {/* Column 2: In Progress */}
      <div
        className="py-6 lg:px-8 lg:py-0 border-y lg:border-y-0 lg:border-x border-slate-200"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop('inProgress')}
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span> In Progress
          </h3>
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-lg">
            {progressTasks.length}
          </span>
        </div>
        <div className="space-y-4">
          {progressTasks.length > 0 ?(
            progressTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                date={new Date(task.createdAt).toLocaleDateString()}
                isComplete={task.isComplete}
                onDelete={handleDelete}
                onDragStart={() => handleDragStart(task.id)}
                draggable
                handleClick={handleClick}
              />
            ))
          ):(<p className="text-slate-400 text-sm text-center py-10">No pending tasks found</p>)
    }
        </div>
      </div>

      {/* Column 3: Completed */}
      <div
        className="py-6 lg:pl-8 lg:py-0"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop('done')}
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Completed
          </h3>
          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">
            {doneTasks.length}
          </span>
        </div>
        <div className="space-y-4">
          {
          doneTasks.length > 0 ? (
          doneTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority}
              date={new Date(task.createdAt).toLocaleDateString()}
              isComplete={task.isComplete}
              onDelete={handleDelete}
              onDragStart={() => handleDragStart(task.id)}
              draggable
              handleClick={handleClick}
              handleComplete={() => handleComplete(task.id)}
            />
          ))
          ):(<p className="text-slate-400 text-sm text-center py-10">No Completed tasks found</p>)
        }
        </div>
      </div>
    </div>
  );
}

export default TaskList;
