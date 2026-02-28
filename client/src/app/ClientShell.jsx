'use client';

import Navbar from "../components/Navbar";

export default function ClientShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}