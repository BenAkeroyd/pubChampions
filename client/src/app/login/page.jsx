'use client';

import { User, Mail, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data?.ok) {
        const me = await axios.get(
          "http://localhost:4000/user/me",
          { withCredentials: true }
        );

        setUser(me.data.user);

        window.location.href = "/dashboard";
      } else {
        setSuccess("Logged in!");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Login failed. Check your email/password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:p-8 overflow-hidden">

      {/* Mouse Glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Background Blobs */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="w-full flex flex-col items-center justify-center mb-8 sm:mb-16 animate-in fade-in slide-in-from-top duration-700">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo1.png"
            alt="PubChampions"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
            <span className="text-white">Pub</span>
            <span className="text-blue-400">Champions</span>
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="max-w-md mx-auto relative w-full border border-white/20 rounded-xl px-10 pt-8 pb-10 backdrop-blur-lg bg-slate-900 animate-in slide-in-from-top duration-700">

        <div className="w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 animate-in slide-in-from-bottom duration-700">
            <User />
            <span className="text-xs sm:text-sm text-blue-300">
              Sign In to Customer Portal
            </span>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="w-full">
            <div className="w-full space-y-3 mb-4 mt-4 animate-in slide-in-from-bottom duration-700 delay-100">

              <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-transparent backdrop-blur-md px-3 py-2 transition focus-within:border-white focus-within:ring-1 focus-within:ring-white/40">
                <Mail size={18} className="shrink-0 text-white/60" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-white text-sm placeholder-white/50 outline-none"
                />
              </div>

              {error && (
                <div className="text-left text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-left text-sm text-green-200 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                  {success}
                </div>
              )}
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-3 sm:gap-4 animate-in slide-in-from-bottom duration-700 delay-300">
              <button
                type="submit"
                disabled={loading}
                className="group w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <span
                className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2 cursor-pointer text-sm">Forgot Your Password?</span>
            </div>
          </form>
          
        </div>
      {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-xs text-white/60">Or Continue With</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        {/* Social Icons */}
        <div className="mt-5 flex items-center justify-center gap-4">

          {/* Google */}
          <button
            type="button"
            className="h-12 w-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md
                      hover:bg-white/10 hover:border-white/30 transition flex items-center justify-center cursor-pointer"
            aria-label="Continue with Google"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H42V20H24v8h11.3C33.8 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.8-3.1-11.3-7.4l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H42V20H24v8h11.3c-.7 2-2.1 3.8-3.9 5l6.2 5.2C37 38.8 44 34 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
          </button>

          {/* Apple */}
          <button
            type="button"
            className="h-12 w-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md
                      hover:bg-white/10 hover:border-white/30 transition flex items-center justify-center cursor-pointer"
            aria-label="Continue with Apple"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white" className="opacity-90">
              <path d="M16.365 1.43c0 1.14-.465 2.228-1.285 3.03-.86.83-2.256 1.47-3.38 1.37-.145-1.1.5-2.27 1.32-3.04.87-.83 2.38-1.43 3.345-1.36zM21.2 17.22c-.61 1.38-.9 2-1.68 3.19-1.08 1.66-2.6 3.73-4.49 3.75-1.68.02-2.11-1.09-4.4-1.08-2.29.01-2.77 1.1-4.45 1.09-1.89-.02-3.33-1.87-4.41-3.53C.46 18.31-.96 13.5 1.21 10.07c1.06-1.68 2.97-2.74 4.75-2.76 1.78-.03 3.46 1.2 4.4 1.2.94 0 2.94-1.48 4.96-1.27.85.04 3.25.34 4.79 2.58-3.97 2.18-3.33 7.9 1.09 9.4z"/>
            </svg>
          </button>

          {/* Facebook (optional) */}
          <button
            type="button"
            className="h-12 w-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md
                      hover:bg-white/10 hover:border-white/30 transition flex items-center justify-center cursor-pointer"
            aria-label="Continue with Facebook"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
              <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.75-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"/>
            </svg>
          </button>

        </div>

      

        <div className="mt-6 w-full flex flex-row items-center justify-center gap-1 animate-in slide-in-from-bottom duration-700 delay-400">
          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">
            Not a member?
          </span>
          <span
            className="bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-1 sm:mb-2 cursor-pointer hover:scale-102"
            onClick={() => (window.location.href = "/register")}
          >
            Create an Account
          </span>
        </div>
      </div>
    </section>
  );
}