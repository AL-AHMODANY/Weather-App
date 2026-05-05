import React from "react";

const LoadingSpinner = ({ fullScreen = false, isDark = true }) => {
  if (fullScreen) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center z-50 ${isDark ? "bg-default" : "bg-slate-100"}`}>
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-sky-200/20 border-t-sky-400 animate-spin" />
          <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-sky-200/10 border-b-sky-300 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
          </div>
        </div>
        <p className={`mt-6 font-dm text-sm tracking-widest uppercase animate-pulse ${isDark ? "text-white/60" : "text-slate-500"}`}>
          Fetching weather...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-5 h-5 rounded-full border-2 border-sky-200/30 border-t-sky-400 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
