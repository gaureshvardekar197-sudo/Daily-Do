import React from "react";
import {
  UserPlus,
  ListTodo,
  CheckSquare,
  BarChart3,
  Repeat,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your account in seconds",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ListTodo,
      title: "Add Tasks",
      description: "Create tasks for Today, Tomorrow, or Later",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckSquare,
      title: "Complete Tasks",
      description: "Mark tasks as completed throughout the day",
      gradient: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your daily completion percentage",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: Repeat,
      title: "Auto Continue",
      description: "Unfinished tasks move to the next day automatically",
      gradient: "from-rose-500 to-red-500",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How DailyDo Works ⚡
          </h2>
          <p className="text-lg text-gray-600">
            A simple, clean workflow designed to keep your day focused and
            productive.
          </p>
        </div>

        {/* Desktop connector line */}
        <div className="hidden lg:block absolute left-0 right-0 top-[55%] h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient}
                            flex items-center justify-center mx-auto mb-6 shadow-lg
                            group-hover:scale-110 transition-transform`}
              >
                <step.icon className="w-8 h-8 text-white" />
              </div>

              {/* Card */}
              <div
                className="relative bg-white/70 backdrop-blur-xl border border-gray-200
                           rounded-2xl p-6 shadow-sm
                           group-hover:shadow-xl group-hover:-translate-y-2
                           transition-all duration-300"
              >
                {/* Step Number */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2
                             w-9 h-9 rounded-full bg-gray-900 text-white
                             flex items-center justify-center text-sm font-bold"
                >
                  {index + 1}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
