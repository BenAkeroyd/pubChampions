'use client';
import { User, Mail, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";

export default function Login() {
  const [mousePosition, setMousePosition] = useState({x:0, y:0});
  useEffect(() => {
          function handleMouseMove(e) {
              setMousePosition({x: e.clientX, y: e.clientY});
          }
          
          window.addEventListener("mousemove", handleMouseMove);
          return() => window.removeEventListener("mousemove", handleMouseMove);
      }, [])
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:p-8 overflow-hidden">
       <div className="absolute inset-0 opacity-30" style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 130, 246, 0.15), transparent 40%)`,
        }}/>
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Card */}
      <div className="max-w-md mx-auto relative w-full border border-white/20 rounded-xl px-10 pt-8 pb-10 backdrop-blur-lg bg-slate-900 animate-in slide-in-from-top duration-700">
        {/* Content: centered horizontally, top-aligned */}
        <div className="w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 animate-in slide-in-from-bottom duration-700">
            <User />
            <span className="text-xs sm:text-sm text-blue-300">
              Sign In to Customer Portal
            </span>
          </div>

          <div className="w-full space-y-3 mb-6 mt-4 animate-in slide-in-from-bottom duration-700 delay-100">
            <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-transparent backdrop-blur-md px-3 py-2 transition focus-within:border-white focus-within:ring-1 focus-within:ring-white/40">
              <Mail size={18} className="shrink-0 text-white/60" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-transparent text-white text-sm placeholder-white/50 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-transparent backdrop-blur-md px-3 py-2 transition focus-within:border-white focus-within:ring-1 focus-within:ring-white/40">
              <LockKeyhole size={18} className="shrink-0 text-white/60" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full bg-transparent text-white text-sm placeholder-white/50 outline-none"
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-3 sm:gap-4 animate-in slide-in-from-bottom duration-700 delay-300">
            <button className="group w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center">
              Log In
            </button>

            <button className="group w-full px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/10 flex items-center justify-center">
              Forgot Password?
            </button>
          </div>
        </div>
        {/*Separating line */}
        <div className="w-80 mt-6 mx-auto h-px bg-white/20 animate-in slide-in-from-bottom duration-700 delay-300"></div>
        <div className="mt-6 w-full flex flex-row items-center justify-center gap-1 animate-in slide-in-from-bottom duration-700 delay-400">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">Not a member?</span>
            <span className="bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-1 sm:mb-2 cursor-pointer hover:scale-102">Create an Account.</span>
          </div>
      </div>
    </section>
  );
}