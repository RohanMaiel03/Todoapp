import React, { useState, useEffect } from 'react';
import { ListTodo, User, Lock, Eye, EyeClosed, AlertTriangle, Trash2, X } from 'lucide-react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [ShowPass, setShowPass] = useState(false)
    const [showModal, setShowModal] = useState(false); // New: Modal State
    const [pendingData, setPendingData] = useState(null); // New: Store data while waiting for confirm
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        reset,
        watch,
        setError,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            repassword: "",
        }
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                username: "",
                password: "",
                repassword: "",
            });
        }
    }, [isSubmitSuccessful, reset]);



    const [username, password, repassword] = watch(["username", "password", "repassword"])
    // console.log("watch", username, password, repassword);

    const user = JSON.parse(localStorage.getItem("userData"));
    // console.log(user);

    // New: Function to actually save data and clear old
    const confirmAndCreateAccount = (data) => {
        localStorage.clear(); // Clears all old tasks and user data
        localStorage.setItem("userData", JSON.stringify({ username: data.username, password: data.password }));
        setShowModal(false);
        navigate('/login');
    };

    const onSubmit = (data) => {
        // Validation for matching passwords
        if (data.password !== data.repassword) {
            setError("repassword", {
                type: "manual",
                message: "Passwords do not match",
            });
            return;
        }

        // Logic to show pop-up if user already exists
        if (user != null) {
            setPendingData(data); // Store data to save later
            setShowModal(true);   // Show the pop-up
        } else {
            localStorage.setItem("userData", JSON.stringify({ username: data.username, password: data.password }));
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 relative">

            {/* --- POP-UP MODAL START --- */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>

                    {/* Modal Box */}
                    <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200">
                        <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
                                <AlertTriangle size={32} />
                            </div>

                            <h3 className="text-xl font-black text-slate-900 leading-tight">Account Exists!</h3>
                            <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed">
                                Creating a new account will <span className="text-rose-600 font-bold underline">delete all your old tasks</span> and data. Do you want to continue?
                            </p>

                            <div className="w-full space-y-3 mt-8">
                                <button
                                    onClick={() => confirmAndCreateAccount(pendingData)}
                                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-rose-100"
                                >
                                    <Trash2 size={18} />
                                    Delete & Create New
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* --- POP-UP MODAL END --- */}

            {/* Background Decorative Blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-4">
                        <i className="text-white text-xl"><ListTodo /></i>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 mt-2 font-medium">All your tasks, one organized space.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-white">
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                        {/* Full Name Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="John Doe"
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

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock size={18} />
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
                                    {ShowPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                                </button>
                            </div>
                            {errors.password && <span className="text-red-500  text-xs ml-1 font-bold">{errors.password.message}</span>}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("repassword", {
                                        required: { value: true, message: "Repassword is required" },
                                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                                        maxLength: { value: 20, message: "password must be less then 20 characters" }
                                    })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder:text-slate-400"
                                />
                            </div>
                            {errors.repassword && <span className="text-red-500  text-xs ml-1 font-bold">{errors.repassword.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <input
                            type="submit"
                            value="Create Account"
                            className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-200 transition-all duration-300 transform active:scale-[0.98] mt-4 cursor-pointer"
                        />


                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-400 font-semibold tracking-wider">Or continue with Ram</span>
                        </div>
                    </div>

                    {/* Footer Link */}
                    <p className="text-center mt-8 text-slate-500 font-medium">
                        Already have an account?
                        <Link to="/login" className="ml-1 text-indigo-600 hover:text-indigo-700 font-bold underline-offset-4 hover:underline transition-all">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;