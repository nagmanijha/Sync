import React from "react";

const SocialProof = () => {
    const brands = [
        "TechCorp",
        "InnovateLabs",
        "FutureScale",
        "GlobalSync",
        "NextGen Systems",
    ];

    return (
        <section className="py-10 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">
                    Trusted by forward-thinking teams
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {brands.map((brand) => (
                        <div key={brand} className="text-xl font-bold text-slate-400 hover:text-indigo-600 cursor-default">
                            {/* Placeholder for Logos - using stylized text for now */}
                            <span className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-current opacity-20" />
                                {brand}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
