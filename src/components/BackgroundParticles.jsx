import React from "react";

const PARTICLES = [
  { size: 80, top: "10%", left: "5%", delay: "0s", duration: "8s", opacity: 0.06 },
  { size: 120, top: "20%", right: "8%", delay: "2s", duration: "10s", opacity: 0.04 },
  { size: 60, top: "60%", left: "15%", delay: "4s", duration: "7s", opacity: 0.07 },
  { size: 100, top: "75%", right: "20%", delay: "1s", duration: "9s", opacity: 0.05 },
  { size: 40, top: "40%", left: "50%", delay: "3s", duration: "6s", opacity: 0.08 },
  { size: 90, top: "85%", left: "40%", delay: "5s", duration: "11s", opacity: 0.04 },
  { size: 50, top: "5%", left: "70%", delay: "1.5s", duration: "8s", opacity: 0.06 },
  { size: 70, top: "50%", right: "5%", delay: "3.5s", duration: "9s", opacity: 0.05 },
];

const BackgroundParticles = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
    {PARTICLES.map((p, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: p.size,
          height: p.size,
          top: p.top,
          left: p.left,
          right: p.right,
          background: `radial-gradient(circle, rgba(56,189,248,${p.opacity}) 0%, transparent 70%)`,
          animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
        }}
      />
    ))}
    {/* Subtle grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

export default BackgroundParticles;
