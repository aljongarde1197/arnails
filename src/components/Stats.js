"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSmile, FaStar, FaRedo } from "react-icons/fa";

export default function Stats() {
  const stats = [
    { id: 1, label: "Happy Clients", icon: <FaSmile className="text-pink-500 w-8 h-8 sm:w-10 sm:h-10" />, value: 32 },
    { id: 2, label: "Nail Sets Done", icon: <FaStar className="text-pink-500 w-8 h-8 sm:w-10 sm:h-10" />, value: 58 },
    { id: 3, label: "Returning Clients", icon: <FaRedo className="text-pink-500 w-8 h-8 sm:w-10 sm:h-10" />, value: 95, suffix: "%" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, i) => {
          if (count < stats[i].value) {
            const increment = Math.ceil(stats[i].value / 100);
            return Math.min(count + increment, stats[i].value);
          }
          return count;
        })
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="py-16 sm:py-20 bg-pink-50">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary text-pink-600 mb-12">
          My Achievements
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="bg-white shadow-lg rounded-xl p-6 sm:p-8 flex-1 max-w-xs w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="mb-3 sm:mb-4">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-thin text-pink-600">
                {counts[index]}
                {stat.suffix ? stat.suffix : ""}
              </div>
              <p className="text-gray-700 mt-1 sm:mt-2 font-semibold text-sm sm:text-base text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
