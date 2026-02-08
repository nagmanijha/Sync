
import { CheckCircle2 } from "lucide-react";

const ProductShowcase = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section 1 */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-30" />
                            <div className="relative bg-white rounded-2xl p-1 shadow-2xl skew-y-3 lg:-ml-12 hover:skew-y-0 transition-transform duration-700 overflow-hidden group border border-slate-200">
                                <img
                                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
                                    alt="Task Management Interface"
                                    className="w-full h-auto rounded-xl shadow-inner group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <h3 className="text-3xl font-bold text-slate-900 mb-6">
                            Designed for Clarity & Focus
                        </h3>
                        <p className="text-lg text-slate-600 mb-8">
                            Stop wrestling with clunky software. Our intuitive interface puts the most important tasks front and center, reducing noise and increasing throughput.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Kanban & List views for ultimate flexibility",
                                "Drag-and-drop task management",
                                "One-click filter for your assigned tasks",
                                "Dark mode support for late-night sessions"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Section 2 (Content Left, Image Right) */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                            <div className="relative bg-white rounded-2xl p-1 shadow-2xl skew-y-3 lg:-ml-12 hover:skew-y-0 transition-transform duration-700 overflow-hidden group border border-slate-200">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                                    alt="Analytics Dashboard"
                                    className="w-full h-auto rounded-xl shadow-inner group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <h3 className="text-3xl font-bold text-slate-900 mb-6">
                            Data-Driven Decisions
                        </h3>
                        <p className="text-lg text-slate-600 mb-8">
                            Gain visibility into your team's performance. Identify bottlenecks, track velocity, and ensure you deliver on time, every time.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Real-time project velocity tracking",
                                "Burndown charts creation automatically",
                                "Team workload distribution heatmaps",
                                "Exportable reports for clients"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
