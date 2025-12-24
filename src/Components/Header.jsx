import React from 'react'

function Header({onOpen} ) {
  return (
    <>
    <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Board</h2>
              <p className="text-slate-500 font-medium">Manage and organize your team tasks</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2 w-fit"
            onClick={onOpen}>
              <i className="fa-solid fa-plus"></i> New Task
            </button>
          </div>
        </section>
    </>
  )
}

export default Header
