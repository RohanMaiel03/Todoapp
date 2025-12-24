import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { useState } from 'react'
import Aboutus from './Components/Aboutus'
import ProfileSettings from './Components/ProfileSettings'
import NotFound from './Components/NotFound'
import ForgotPassword from './Components/ForgotPassword'
function App() {
   const [isLoggedIn, setisLoggedIn] = useState(false)
   //console.log("App",isLoggedIn);
   

  return (
    <>
   
     <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setisLoggedIn} />} />
        <Route path='/To-do-list' element={isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/> : <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setisLoggedIn}/>} />
        <Route path='/aboutus' element={isLoggedIn ? <Aboutus/>:<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setisLoggedIn}/>} />
        <Route path='/Profile/:username' element={isLoggedIn ? <ProfileSettings/>:<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setisLoggedIn}/>} />
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='*' element={<NotFound/>} />
     </Routes>
    
    </>
  )
}

export default App
