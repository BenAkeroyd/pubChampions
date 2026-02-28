"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function ClientShell({ children }) {
  const pathname = usePathname();

  const showNavbar = pathname === "/"

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
}