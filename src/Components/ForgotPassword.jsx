import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const [ShowPass, setShowPass] = useState(false);
    const [step, setStep] = useState(1); // Step 1: Find User, Step 2: Reset Pass
    const [foundUser, setFoundUser] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    // STEP 1: Check if user exists
    const onVerifyUser = (data) => {
        const localData = JSON.parse(localStorage.getItem("userData"));
        
        if (localData && localData.username === data.username) {
            setFoundUser(localData);
            setStep(2);
        } else {
            setError("username", { 
                type: "manual", 
                message: "No account found with this username" 
            });
        }
    };

    // STEP 2: Update the password
    const onResetPassword = (data) => {
        const updatedData = {
            ...foundUser,
            password: data.newPassword
        };
        
        localStorage.setItem("userData", JSON.stringify(updatedData));
        setStep(3); // Success Step
        
        // Auto redirect to login after 3 seconds
        setTimeout(() => navigate('/login'), 3000);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 relative">
            {/* Background Decorative Blobs (Matching your SignUp) */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-4 text-white">
                        <KeyRound size={24} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {step === 1 ? "Reset Password" : step === 2 ? "New Password" : "Success!"}
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium text-center">
                        {step === 1 ? "Enter your username to recover access" : 
                         step === 2 ? `Set a new password for ${foundUser.username}` : 
                         "Your password has been updated."}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-white">
                    
                    {/* STEP 1: USERNAME SEARCH */}
                    {step === 1 && (
                        <form className="space-y-6" onSubmit={handleSubmit(onVerifyUser)}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Account Username</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        {...register("username", { required: "Username is required" })}
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold"
                                    />
                                </div>
                                {errors.username && <p className="text-red-500 text-xs ml-2 font-bold">{errors.username.message}</p>}
                            </div>

                            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]">
                                Find Account
                            </button>
                        </form>
                    )}

                    {/* STEP 2: NEW PASSWORD SET */}
                    {step === 2 && (
                        <form className="space-y-6" onSubmit={handleSubmit(onResetPassword)}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                    <input
                                        type={ShowPass ? "text" : "password"}
                                        placeholder="Min 8 characters"
                                        {...register("newPassword", { 
                                            required: "New password is required",
                                             minLength: { value: 8, message: "Password must be at least 8 characters" }, 
                                             maxLength : {value: 20, message: "password must be less then 20 characters"}
                                        })}
                                        className="w-full pl-12 pr-14 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPass(!ShowPass)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                    >
                                        {ShowPass ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </div>
                                {errors.newPassword && <p className="text-red-500 text-xs ml-2 font-bold">{errors.newPassword.message}</p>}
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]">
                                Update Password
                            </button>
                        </form>
                    )}

                    {/* STEP 3: SUCCESS STATE */}
                    {step === 3 && (
                        <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="flex justify-center">
                                <CheckCircle2 className="text-emerald-500" size={64} />
                            </div>
                            <p className="text-slate-600 font-bold tracking-tight">Redirecting you to login...</p>
                        </div>
                    )}

                    {/* Footer Link */}
                    {step !== 3 && (
                        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
                            <Link to="/login" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all">
                                <ArrowLeft size={16} />
                                Back to Log in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;