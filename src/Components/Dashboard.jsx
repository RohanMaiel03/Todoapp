import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

const Dashboard = ({isLoggedIn, setIsLoggedIn}) => {
  
  
  return (
    <>
    <div className="flex bg-[#f8fafc] text-slate-900 min-h-screen">
    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Main />
    </div>
   
    </>
      

  );
};

export default Dashboard;