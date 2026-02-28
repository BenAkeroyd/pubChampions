'use client';
import { CircleGauge, Menu, User, X} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const { user, loading } = useAuth();
    const isLoggedIn = !!user;

    const buttonIcon = isLoggedIn ? <CircleGauge /> : <User />;
    const buttonLabel = isLoggedIn ? "Dashboard" : "Sign In";
    const buttonRoute = isLoggedIn ? "/dashboard" : "/login";

    // change colours when logged in
    const buttonStyle = isLoggedIn
    ? "from-cyan-500 to-blue-500 hover:brightness-110"
    : "from-blue-600 to-blue-400";
    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h16 md:h-20">
                    <div className="flex items-center space-x-1 group cursor-pointer">
                        <div>
                            <img 
                             src= "/logo1.png" 
                             alt="PubChampions" 
                             className="w-6 h-6 sm:w-8 sm:h-8"
                            />
                        </div>
                        <Link href="/" className="text-lg sm:text-xl md:text-2xl font-medium">
                            <span className="text-white">Pub</span>
                            <span className="text-blue-400">Champions</span>
                        </Link>
                    </div>

                    {/*Navbar Links */}
                     {isHomePage && (
                        <>
                        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                                <a href="#features" className="text-gray-300 hover:text-white text-small lg:text-base">
                                Features
                                </a>

                                <a href="#pricing" className="text-gray-300 hover:text-white text-small lg:text-base">
                                Pricing
                                </a>

                                <a href="#testimonials" className="text-gray-300 hover:text-white text-small lg:text-base">
                                Testimonials
                                </a>
                                {!loading && (
                                <button
                                    onClick={() => router.push(buttonRoute)}
                                    className={`group w-full sm:w-auto px-2 sm:px-4 py-1.5 sm:py-3 bg-gradient-to-b ${buttonStyle} rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2 cursor-pointer`}
                                >
                                    {buttonIcon}
                                    <div>{buttonLabel}</div>
                                </button>
                                )}
                        </div>
                    </>
                        )}
                     {isHomePage && (
                        <>
                    <div className="flex items-center space-x-2 md:hidden">
                        {!loading && (
                            <button
                                onClick={() => router.push(buttonRoute)}
                                className={`px-3 py-1.5 bg-gradient-to-b ${buttonStyle} rounded-lg text-xs font-semibold flex items-center space-x-1`}
                            >
                                {buttonIcon}
                                <span>{buttonLabel}</span>
                            </button>
                            )}

                        <button
                            className="p-2 text-gray-300 hover:text-white"
                            onClick={() => setMobileMenuIsOpen(prev => !prev)}
                        >
                            {mobileMenuIsOpen ? (
                            <X className="w-5 h-5" />
                            ) : (
                            <Menu className="w-5 h-5" />
                            )}
                        </button>
                        </div>
                    </>
                        )}
                </div>
            </div>
             {mobileMenuIsOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
                <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
                    <a href="#features" onClick={() => setMobileMenuIsOpen(false)} className="block text-gray-300 hover:text-white text-small lg:text-base">Features</a>
                    <a href="#pricing" onClick={() => setMobileMenuIsOpen(false)} className="block text-gray-300 hover:text-white text-small lg:text-base">Pricing</a>
                    <a href="#testimonials" onClick={() => setMobileMenuIsOpen(false)} className="block text-gray-300 hover:text-white text-small lg:text-base">Testimonials</a>
                </div>
            </div>
             )}
        </nav>
    
    );
}