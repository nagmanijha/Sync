import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AUTH_ROUTES } from "../../routes/common/routePaths";

const CTA = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Ready to scale your management?
                </h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Join thousands of teams who have switched to a better way of working. No credit card required.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to={AUTH_ROUTES.SIGN_UP}
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 transition-all hover:scale-105"
                    >
                        Get Started Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>

                <p className="mt-6 text-sm text-slate-500">
                    Free 14-day trial on Pro plans. Cancel anytime.
                </p>
            </div>
        </section>
    );
};

export default CTA;
