import React, { useState, useEffect } from 'react';
import NewTaskPopUp from './NewTaskPopUp';
import Header from './Header';
import TaskList from './TaskList';
import { ChevronUp } from 'lucide-react'; // Import an icon for the button

function Main() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showScrollBtn, setShowScrollBtn] = useState(false); // State for scroll button

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);

    // Scroll listener for the main container
    const mainElement = document.getElementById('main-content');
    const handleScroll = () => {
      if (mainElement.scrollTop > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    mainElement?.addEventListener('scroll', handleScroll);
    return () => mainElement?.removeEventListener('scroll', handleScroll);
  }, []);

  const addTask = (newTask) => {
    setTasks(prev => {
      const updated = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const scrollToTop = () => {
    document.getElementById('main-content').scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Added id="main-content" to target it for scrolling */}
      <main id="main-content" className="flex-1 h-screen overflow-y-auto p-4 sm:p-8 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <Header onOpen={() => setIsPopUpOpen(true)}/>  

          {/* 3-Part Task Board with Vertical Dividers */}
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>

        {/* Scroll Up Button - only visible on small screens (sm:hidden) */}
        {showScrollBtn && (
          <button
            onClick={scrollToTop}
            className="lg:hidden fixed bottom-1 right-6 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-2xl active:scale-90 transition-all animate-in fade-in zoom-in duration-300"
          >
            <ChevronUp size={24} />
          </button>
        )}

        {isPopUpOpen && (
          <NewTaskPopUp onClose={() => setIsPopUpOpen(false)} onAddTask={addTask} />
        )}
      </main>
    </>
  );
}

export default Main;