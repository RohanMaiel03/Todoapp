import React from 'react'
import { Trash } from 'lucide-react';

function TaskCard({ id, title, priority, date, isComplete, onDelete, onDragStart, handleClick }) {
    // Note: Always check if user exists to prevent crashes
    const user = JSON.parse(localStorage.getItem("userData")) || { username: "Guest" };
    //console.log("colour", priority);

    const priorityColor = {
        High: 'text-red-500',
        Medium: 'text-yellow-500',
        Normal: 'text-green-500',
    };

    return (
        <div className={`bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all cursor-grab active:grabbing group ${isComplete ? 'bg-slate-50/40' : ''}`}
            draggable
            onDragStart={() => onDragStart(id)}
            onClick={() => { handleClick(id) }}
        >

            {/* Header Section */}
            <div className="flex justify-between items-start mb-2" >
                <h4 className={`font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors ${isComplete ? 'line-through text-slate-400' : ''}`}>
                    {title || "Untitled Task"}
                </h4>
                <div className="flex items-center gap-1">
                    {/* Ellipsis button for extra options */}
                    <button className="text-slate-300 hover:text-slate-500 transition-colors p-1">
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                </div>
            </div>

            {/* Category / Priority */}
            <p className={`text-xs font-medium mb-4 ${priorityColor[priority] || 'text-slate-400'}`}>
                {priority || 'No Priority'}
            </p>


            {/* Footer Section */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="flex -space-x-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full border-2 border-white" title={user.username}>
                            {user.username.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    {/* Date */}
                    <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${isComplete ? 'text-emerald-500' : 'text-slate-400'}`}>
                        <i className={isComplete ? "fa-solid fa-circle-check" : "fa-regular fa-calendar"}></i>
                        {date || "No Date"}
                    </div>
                </div>

                {/* DELETE BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                    title="Delete Task"
                >
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default TaskCard