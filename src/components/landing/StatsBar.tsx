"use client";

import React, { useEffect, useState } from "react";

const stats = [
  { label: "Students Supported", value: 12500, suffix: "+" },
  { label: "Volunteers Active", value: 4800, suffix: "+" },
  { label: "Sessions Completed", value: 85000, suffix: "+" },
];

export default function StatsBar() {
  return (
    <section className="bg-primary py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <StatItem key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/80 font-medium text-lg lg:text-xl uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
