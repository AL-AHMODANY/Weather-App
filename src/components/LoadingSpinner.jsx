import React from "react";

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-default">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-sky-400 animate-spin" />
          {/* Inner ring */}
          <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-white/5 border-b-sky-300 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-white/60 font-dm text-sm tracking-widest uppercase animate-pulse">
          Fetching weather...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-sky-400 animate-spin" />
    </div>
  );
};

// Skeleton card for loading state
export const SkeletonCard = ({ className = "" }) => (
  <div className={`glass-card rounded-2xl p-5 ${className}`}>
    <div className="skeleton h-4 w-1/3 mb-3" />
    <div className="skeleton h-8 w-1/2 mb-2" />
    <div className="skeleton h-4 w-2/3" />
  </div>
);

export const SkeletonMain = () => (
  <div className="glass-card rounded-3xl p-8 animate-pulse">
    <div className="flex justify-between items-start mb-6">
      <div>
        <div className="skeleton h-8 w-48 mb-2" />
        <div className="skeleton h-4 w-32" />
      </div>
      <div className="skeleton h-20 w-20 rounded-full" />
    </div>
    <div className="skeleton h-24 w-40 mb-4" />
    <div className="skeleton h-5 w-36 mb-2" />
    <div className="skeleton h-4 w-48" />
  </div>
);

export default LoadingSpinner;
