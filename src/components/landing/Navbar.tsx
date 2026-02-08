import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { AUTH_ROUTES } from "../../routes/common/routePaths";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "How it works", href: "#how-it-works" },
        { name: "Testimonials", href: "#testimonials" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Sync</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to={AUTH_ROUTES.SIGN_IN}
                            className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to={AUTH_ROUTES.SIGN_UP}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-all bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20"
                        >
                            Sign Up
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-indigo-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl md:hidden flex flex-col p-4 space-y-4 animate-in slide-in-from-top-5 duration-200">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-slate-600 hover:text-indigo-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <hr className="border-slate-100" />
                    <Link
                        to={AUTH_ROUTES.SIGN_IN}
                        className="text-base font-medium text-slate-700 hover:text-indigo-600 py-2"
                    >
                        Log in
                    </Link>
                    <Link
                        to={AUTH_ROUTES.SIGN_UP}
                        className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                    >
                        Sign Up Now
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
