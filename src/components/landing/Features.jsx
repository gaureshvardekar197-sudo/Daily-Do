import React from "react";
import {
  Calendar,
  Target,
  RefreshCw,
  BarChart,
  Search,
  Shield,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Task Types",
      description: "Organize tasks into Today, Tomorrow, and Later categories",
      details: [
        "Today – Immediate focus",
        "Tomorrow – Smart planning",
        "Later – Future goals",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Priority Levels",
      description: "Set Low, Medium, or High priority for each task",
      details: [
        "Low – Not urgent",
        "Medium – Normal flow",
        "High – Critical focus",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: RefreshCw,
      title: "Auto Carry-Forward",
      description: "Unfinished tasks automatically move to the next day",
      details: [
        "No task left behind",
        "Smart rollover",
        "Stress-free planning",
      ],
      gradient: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: BarChart,
      title: "Completion Analytics",
      description: "Visual progress tracking with percentage insights",
      details: [
        "Daily performance",
        "Completion stats",
        "Productivity boost",
      ],
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find tasks instantly with filters & search",
      details: [
        "Search by name",
        "Filter by priority",
        "Quick access",
      ],
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Shield,
      title: "User Management",
      description: "Secure authentication and profile management",
      details: [
        "Secure login",
        "Data protection",
        "User profiles",
      ],
      gradient: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Built for Daily Productivity 🚀
        </h2>
        <p className="text-lg text-gray-600">
          Smart features designed to keep you focused, organized, and always one
          step ahead.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-7 
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient}
                          flex items-center justify-center mb-5 shadow-lg
                          group-hover:scale-110 transition-transform`}
            >
              <feature.icon className="w-7 h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-5">
              {feature.description}
            </p>

            {/* Details */}
            <ul className="space-y-2">
              {feature.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-500"
                >
                  <span
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3`}
                  ></span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
