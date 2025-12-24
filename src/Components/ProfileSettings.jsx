import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Sidebar from './Sidebar';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const ProfileSettings = () => {
    const [ShowPass, setShowPass] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // Get current user for initial state
    const savedUser = JSON.parse(localStorage.getItem("userData")) || { username: "", password: "" };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isDirty }, // Added isDirty
    } = useForm({
        defaultValues: {
            username: savedUser.username,
            password: "", 
        }
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            // Re-fetch saved user to ensure reset uses the absolute latest data
            const latestUser = JSON.parse(localStorage.getItem("userData"));
            reset({
                username: latestUser.username,
                password: "",
            });
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = (data) => {
        const currentUser = JSON.parse(localStorage.getItem("userData")) || {};
        
        const updatedUser = {
            ...currentUser,
            username: data.username || currentUser.username,
            password: data.password || currentUser.password 
        };

        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setSuccessMsg("Profile updated successfully! ✅");
        
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            <Sidebar />

            <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="mb-8 lg:mb-12">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
                        <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Manage your account and security preferences</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/60 shadow-sm relative">

                            {successMsg && (
                                <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100 animate-pulse">
                                    {successMsg}
                                </div>
                            )}

                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Personal Information</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Username Input */}
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 ml-1 uppercase tracking-widest">Public Username</label>
                                    <div className="relative">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            {...register("username", { 
                                                required: "Username is required", 
                                                minLength: { value: 3, message: "Minimum 3 characters" }, 
                                                maxLength: {value: 20 , message: "Maximum 20 characters"}
                                            })}
                                            placeholder="Username"
                                            className={`w-full pl-14 pr-6 py-4 bg-slate-50 border ${errors.username ? 'border-red-400' : 'border-slate-200'} rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-slate-700`}
                                        />
                                    </div>
                                    {errors.username && <p className="text-red-500 text-xs ml-2 font-bold">{errors.username.message}</p>}
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 ml-1 uppercase tracking-widest">Update Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type={ShowPass ? "text" : "password"} 
                                            {...register("password", { 
                                                minLength: { value: 8, message: "Password must be at least 8 characters" }, 
                                                maxLength : {value: 20, message: "password must be less then 20 characters"}
                                            })}
                                            placeholder="Leave blank to keep current"
                                            className={`w-full pl-14 pr-14 py-4 bg-slate-50 border ${errors.password ? 'border-red-400' : 'border-slate-200'} rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold`}
                                        />
                                        <button 
                                            type="button"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors"
                                            onClick={() => setShowPass(!ShowPass)}
                                        >
                                            {ShowPass ? <Eye size={20} /> : <EyeOff size={20} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs ml-2 font-bold">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center gap-6 justify-between">
                                <p className="text-xs text-slate-400 font-medium max-w-xs text-center md:text-left">
                                    {isDirty ? "You have unsaved changes." : "No changes detected."}
                                </p>
                                <button 
                                    type="submit"
                                    disabled={!isDirty} // Logic: Disable if nothing changed
                                    className={`w-full md:w-auto px-10 py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 
                                        ${isDirty 
                                            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 cursor-pointer" 
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                                        }`}
                                >
                                    Update Profile
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileSettings;