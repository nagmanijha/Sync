import React from "react";
import { UserPlus, FolderPlus, CheckSquare } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <UserPlus className="w-8 h-8 text-indigo-600" />,
            title: "1. Create & Invite",
            description: "Set up your workspace and invite team members via email in seconds."
        },
        {
            icon: <FolderPlus className="w-8 h-8 text-indigo-600" />,
            title: "2. Organize Projects",
            description: "Create projects, define milestones, and set clear objectives for your team."
        },
        {
            icon: <CheckSquare className="w-8 h-8 text-indigo-600" />,
            title: "3. Track Progress",
            description: "Assign tasks, monitor completion rates, and ship faster than ever."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-16">
                    Start managing in minutes, not days.
                </h2>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-indigo-100 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-white rounded-full border border-indigo-100 flex items-center justify-center shadow-sm mb-6 relative">
                                {step.icon}
                                <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
