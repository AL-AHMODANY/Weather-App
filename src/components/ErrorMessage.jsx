import React from "react";
import { MdErrorOutline } from "react-icons/md";

const ErrorMessage = ({ message, isDark = true }) => (
  <div className={`glass-card rounded-2xl p-5 border animate-fade-in ${isDark ? "border-red-400/20" : "border-red-300"}`}>
    <div className="flex items-start gap-3">
      <MdErrorOutline size={22} className="text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className={`font-outfit font-semibold text-sm ${isDark ? "text-red-300" : "text-red-600"}`}>Oops!</p>
        <p className={`font-dm text-sm mt-0.5 ${isDark ? "text-white/60" : "text-slate-600"}`}>{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
