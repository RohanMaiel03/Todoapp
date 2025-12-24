import React ,{useEffect}from 'react';
import { X } from 'lucide-react';
import { useForm } from "react-hook-form"


const NewTaskPopUp = ({ onClose, onAddTask }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: "",
      priority: "Normal",
    }
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        priority: "Normal",
      });
    }
  }, [isSubmitSuccessful, reset]);


  const user = JSON.parse(localStorage.getItem("userData"));

  const onSubmit = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      priority: data.priority,
      creator: data.username,
      status: "todo",
      isComplete: false,
      createdAt: new Date().toISOString(),
    };
    onAddTask(newTask)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Background Blur Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* The Pop-up Card */}
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">

        {/* Header Section */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Quick Task</h2>
            <p className="text-slate-400 text-xs font-medium mt-1 flex items-center gap-2">
              <i className="fa-regular fa-clock text-indigo-500"></i>
              Creating at <span className="text-slate-600 font-bold">{currentTime}</span>
            </p>
          </div>

          {/* Top Right Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:rotate-90 transition-all duration-300"
          ><X />
          </button>
        </div>

        {/* Form Body */}
        <form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

          {/* Task Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Task Title</label>
            <input
              type="text"
              autoFocus
              {...register("title", { required: "Title is required", minLength: { value: 2, message: "Title must be at least 2 characters" }, maxLength: { value: 30, message: "Title must be less than 30 characters" } })}
              placeholder="What's on your mind?"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400"
            />
            {errors.title && <span className="text-red-500  text-md ml-1">{errors.title.message}</span>}
          </div>
          {/* Creator Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Creator</label>
            <div className="relative">
              <i className="fa-regular fa-user absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                defaultValue={user.username}
                {...register("username")}
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-600"
              />
            </div>
          </div>

          {/* Priority Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Priority Level</label>
            <div className="relative">
              <i className="fa-solid fa-layer-group absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <select className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-600 cursor-pointer appearance-none"
                {...register("priority")}>
                <option className="text-green-500">Normal</option>
                <option className="text-yellow-500">Medium</option>
                <option className="text-red-500">High</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all duration-300 active:scale-95"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskPopUp;