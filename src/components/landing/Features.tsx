import React from "react";
import { Briefcase, ShieldCheck, BarChart3, Lock, History, Users } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: <Briefcase className="w-6 h-6 text-white" />,
            title: "Multi-Workspace",
            description: "Switch context instantly between different clients or extensive projects without losing focus.",
            color: "bg-blue-500",
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-white" />,
            title: "Role-Based Access",
            description: "Granular permissions for Owners, Admins, and Members to ensure data security.",
            color: "bg-indigo-500",
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-white" />,
            title: "Real-Time Analytics",
            description: "Track velocity, completion rates, and team performance with interactive dashboards.",
            color: "bg-violet-500",
        },
        {
            icon: <Lock className="w-6 h-6 text-white" />,
            title: "Secure OAuth",
            description: "Enterprise-grade security with Google Login. Your data is encrypted and safe.",
            color: "bg-teal-500",
        },
        {
            icon: <History className="w-6 h-6 text-white" />,
            title: "Activity Logs",
            description: "Full audit trails of every action taken within the workspace for compliance.",
            color: "bg-amber-500",
        },
        {
            icon: <Users className="w-6 h-6 text-white" />,
            title: "Team Collaboration",
            description: "Comments, assignments, and real-time updates keep everyone on the same page.",
            color: "bg-rose-500",
        },
    ];

    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Powerful Features</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Everything you need to manage <br /> complex projects.
                    </h3>
                    <p className="text-lg text-slate-600">
                        Built for speed and scalability, our platform adapts to your workflow, not the other way around.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
