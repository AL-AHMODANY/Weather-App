import React from "react";
import { MdErrorOutline } from "react-icons/md";

const ErrorMessage = ({ message }) => (
  <div className="glass-card rounded-2xl p-5 border border-red-400/20 animate-fade-in">
    <div className="flex items-start gap-3">
      <MdErrorOutline size={22} className="text-red-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-outfit font-semibold text-red-300 text-sm">Oops!</p>
        <p className="font-dm text-white/60 text-sm mt-0.5">{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
