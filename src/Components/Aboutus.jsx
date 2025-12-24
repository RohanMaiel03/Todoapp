import React from 'react';
import Sidebar from './Sidebar';
import { 
  BookOpen, Sparkles, CheckCircle2, 
   Layout, Cpu, AlertTriangle, 
   Monitor, Code2, Globe, PlusCircle
} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

function Aboutus() {
  const naviagte = useNavigate()
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
          
          {/* Header Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              About <span className="text-indigo-600">TaskFlow</span>
            </h1>
            <p className="text-slate-500 font-medium mt-4 max-w-2xl text-base">
              Master your productivity with our cross-device manual and high-performance tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* PART 1: Our Mission */}
            <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200/60 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                TaskFlow makes your work easier. We keep your tasks organized and your workspace clutter-free, so you can focus on getting things done.
              </p>
              
              <div className="space-y-4">
                {["Clean & Minimalist Design", "Privacy-Focused Logic", "Seamless User Experience"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* PART 2: Tech Stack */}
            <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200/60 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                  <Cpu size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Technology</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <Code2 className="mx-auto mb-2 text-indigo-600" size={20} />
                  <p className="text-[10px] font-black uppercase text-slate-400">Frontend</p>
                  <p className="font-bold text-slate-800 text-sm">React + Vite</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <Layout className="mx-auto mb-2 text-indigo-600" size={20} />
                  <p className="text-[10px] font-black uppercase text-slate-400">Forms</p>
                  <p className="font-bold text-slate-800 text-sm">React Hook Form</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <Globe className="mx-auto mb-2 text-indigo-600" size={20} />
                  <p className="text-[10px] font-black uppercase text-slate-400">Styling</p>
                  <p className="font-bold text-slate-800 text-sm">Tailwind CSS</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <Cpu className="mx-auto mb-2 text-indigo-600" size={20} />
                  <p className="text-[10px] font-black uppercase text-slate-400">Icons</p>
                  <p className="font-bold text-slate-800 text-sm">Lucide Icons</p>
                </div>
              </div>
            </section>
          </div>

          {/* PART 3: Cross-Device Manual */}
          <section className="bg-slate-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl text-white">
             <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl font-bold">Usage Manual</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* How to Add/Delete */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    <PlusCircle size={18} /> Managing Your Tasks
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white mb-1">Adding a Task</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Click the <span className="text-indigo-400 font-bold">+ New Task</span> button. Fill in your task details and set the priority. Once you hit submit, it appears instantly on your board.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Deleting a Task</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Made a mistake? Just click the <span className="text-rose-400 font-bold">trash icon</span> on any task card to remove it forever.</p>
                    </div>
                  </div>
                </div>

                {/* Device Guide */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    <Monitor size={18} /> Screen Optimization
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white mb-1">Big Screens (Laptop/PC)</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Complete tasks by <span className="text-white font-bold italic">tapping or dragging</span>. Use your mouse for precision control over your entire workflow.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Small Screens (Mobile)</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Optimized for thumbs. Just <span className="text-white font-bold italic">tap the box</span> on the task card to mark it as finished.</p>
                    </div>
                  </div>
                </div>
              </div>
          </section>

          {/* IMPORTANT WARNING BOX */}
          <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex items-start gap-6">
             <div className="p-3 bg-white rounded-2xl shadow-sm">
                <AlertTriangle size={24} className="text-rose-500" />
             </div>
             <div>
                <h4 className="text-lg font-bold text-rose-900 tracking-tight">Security Warning</h4>
                <p className="text-sm text-rose-700 font-medium leading-relaxed mt-1 max-w-3xl">
                    If you already have an account, <span className="font-black underline uppercase">do not</span> create a new one on this same browser. If you try to create a new account, your <span className="font-bold">old account and all its saved tasks will be lost</span> forever.
                </p>
             </div>
          </div>

          {/* CREATOR FOOTER */}
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold">Ready to start being productive?</h3>
              <p className="text-indigo-100 text-sm font-medium">Your data is saved locally and ready whenever you are.</p>
            </div>
            <button className="relative z-10 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-slate-50 transition-colors shadow-lg active:scale-95"
            onClick={()=>{naviagte("/To-do-list")}}>
              Go to My Tasks
            </button>
            {/* Decorative circles */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>


          <div className="pt-12 border-t border-slate-100 flex flex-col items-center">
             <div className="w-16 h-1 bg-indigo-600 rounded-full mb-6"></div>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Designed & Developed By</p>
             <h3 className="text-2xl font-black text-slate-900 mt-2">
                Rohan Maiel
             </h3>
             <p className="text-slate-500 font-medium text-sm mt-1 opacity-60">© 2025 TaskFlow</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Aboutus;