import React, { useState, useEffect } from 'react';
import { ListTodo, User, Lock, Eye, EyeClosed } from 'lucide-react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
  // console.log("Login",props);

  const [ShowPass, setShowPass] = useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        username: "",
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const user = JSON.parse(localStorage.getItem("userData"));
  //console.log(user);



  const onSubmit = (data) => {
    if (user != null) {
      if (user.username === data.username && user.password === data.password) {
        props.setIsLoggedIn(true);
        navigate('/To-do-list');
      }
    }
    if (user.username === data.username && user.password !== data.password) {
      setError("password", {
        type: "manual",
        message: "Invalid password",
      });
    }
    if (user.username !== data.username) {
      setError("username", {
        type: "manual",
        message: "Invalid username",
      });
    }
  }



  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-4">
            <i className="fa-solid fa-layer-group text-white text-xl"><ListTodo /></i>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 font-medium">Please enter your details to sign in</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-white/20">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <i><User /></i>
                </div>
                <input
                  type="text"
                  placeholder="John"
                  {...register("username", {
                    required: { value: true, message: "Username is required" },
                    minLength: { value: 3, message: "Minimum 3 characters" },
                    maxLength: { value: 20, message: "Maximum 20 characters" }
                  })}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder:text-slate-400"
                />
              </div>
              {errors.username && <span className="text-red-500  text-xs ml-1 font-bold">{errors.username.message}</span>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <Link to="/ForgotPassword" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">ForgotPassword?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock />
                </div>
                <input
                  type={ShowPass ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    maxLength: { value: 20, message: "password must be less then 20 characters" }
                  })}

                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowPass(!ShowPass)}>
                  {ShowPass ? <Eye /> : <EyeClosed />}
                </button>
              </div>
              {errors.password && <span className="text-red-500  text-xs ml-1 font-bold">{errors.password.message}</span>}
            </div>

            {/* Remember Me 
            <div className="flex items-center space-x-2 ml-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer">
                Remember me for 30 days
              </label>
            </div>*/}

            {/* Submit Button */}
            <input
              type="submit"
              value="Login"
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-200 transition-all duration-300 transform active:scale-[0.98] mt-2"
            />
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-semibold tracking-wider">Or Create with</span>
            </div>
          </div>

          {/* Signup Link */}
          <p className="text-center mt-8 text-slate-500 font-medium">
            Don't have an account?
            <Link to="/" className="ml-1 text-indigo-600 hover:text-indigo-700 font-bold underline-offset-4 hover:underline transition-all">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;