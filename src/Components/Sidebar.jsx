import React, { useState } from 'react';
import { Settings, ListTodo, ListCheck, User, UserCircle, LogOut  } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({isLoggedIn, setIsLoggedIn}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  // Safely get user data or provide a fallback to prevent "charAt" errors
  const user = JSON.parse(localStorage.getItem("userData")) || { username: "Guest" };

  // Helper function to keep the code clean
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
      isActive 
        ? "text-indigo-600 bg-indigo-50 shadow-sm" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`;

    const navLinkClasseslogout = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
      isActive 
        ? "text-red-600 bg-indigo-50 shadow-sm" 
        : "text-slate-500 hover:bg-slate-50 hover:text-red-500"
    }`;



  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-2 right-5 z-60">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-600 active:scale-95 transition-all"
        >
          <Settings className={`${isOpen ? 'animate-spin' : 'animate-none'}`} />
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#f8fafc] border-r border-slate-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:h-screen
      `}>
        <div className="h-full flex flex-col p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 text-indigo-600 font-bold text-2xl mb-10">
            <ListTodo />
            <span>TaskFlow</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {/* FIXED: Passed the function to the className prop */}
            <NavLink to="/To-do-list" className={navLinkClasses}>
              <ListCheck size={20} />
              <span>To-Do List</span>
            </NavLink>

            <NavLink to="/aboutus" className={navLinkClasses}>
              <User size={20} />
              <span>About Us</span>
            </NavLink>

            {/* Changed from <a> to <NavLink> for your Profile/Settings page */}
            <NavLink to={`/Profile/${user.username}`} className={navLinkClasses}>
              <UserCircle size={20} />
              <span>Profile Settings</span>
            </NavLink>


            <NavLink to="/login" className={navLinkClasseslogout}
            onClick={()=>{setIsLoggedIn(false)}}>
              <LogOut  size={20} />
              <span>Logout</span>
            </NavLink>
          </nav>

          {/* User Profile Section */}
          <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 font-bold rounded-full">
                {user.username.charAt(0).toUpperCase()}
              </span>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user.username}</p>
              <p className="text-[10px] text-slate-400 font-medium">Online</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;