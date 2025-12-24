import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Animated Icon Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative flex justify-center">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 group transition-transform hover:rotate-12">
              <Ghost size={80} className="text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-8xl font-black text-slate-900 tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-slate-800">Page Lost in Space</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            The page you are looking for doesn't exist or has been moved to another dimension.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-indigo-600 hover:text-black transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Subtle Footer */}
        <p className="text-xs text-slate-400 font-medium">
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;