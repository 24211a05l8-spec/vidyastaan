import React from "react";
import { Zap, Phone, Heart, BarChart3 } from "lucide-react";

const features = [
  {
    title: "AI-Powered Matching",
    desc: "Our smart algorithms find the perfect mentor based on grade, subjects, and language.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    color: "bg-primary/10",
  },
  {
    title: "Voice Access Helpers",
    desc: "Students can interact via phone calls if they lack internet access or smartphones.",
    icon: <Phone className="w-8 h-8 text-accent" />,
    color: "bg-accent/10",
  },
  {
    title: "Skill Workshops",
    desc: "From coding to financial literacy, go beyond textbooks with expert-led sessions.",
    icon: <Heart className="w-8 h-8 text-warning" />,
    color: "bg-warning/10",
  },
  {
    title: "NGO Impact Dashboard",
    desc: "Real-time tracking of student progress and volunteer engagement for our partners.",
    icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
    color: "bg-indigo-500/10",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for impact</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Cutting-edge technology meets grassroots mentorship to create a platform that scales with purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-10 rounded-3xl border border-border bg-background hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed text-lg">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
