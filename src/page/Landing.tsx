import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import SocialProof from "../components/landing/SocialProof";
import Features from "../components/landing/Features";
import ProductShowcase from "../components/landing/ProductShowcase";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

const Landing = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
            <Navbar />
            <main>
                <Hero />
                <SocialProof />
                <Features />
                <ProductShowcase />
                <HowItWorks />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
