import React from "react";
import {
  XCircle,
  CheckCircle,
  Zap,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    {
      problem: "Forgetting important tasks",
      solution: "Auto carry-forward ensures nothing is missed",
    },
    {
      problem: "Overwhelmed by long task lists",
      solution: "Today / Tomorrow / Later keeps focus clear",
    },
    {
      problem: "No clear daily priorities",
      solution: "Priority levels highlight what matters most",
    },
    {
      problem: "No visibility into progress",
      solution: "Completion percentage shows daily wins",
    },
  ];

  const results = [
    {
      icon: TrendingUp,
      title: "Productivity Boost",
      description: "Users complete more tasks every day",
      value: "3×",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Better Focus",
      description: "Less stress, more clarity throughout the day",
      value: "89%",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "User Satisfaction",
      description: "Consistent sense of accomplishment",
      value: "4.8/5",
      gradient: "from-purple-500 to-fuchsia-500",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Productivity Built for Real Life ✨
          </h2>
          <p className="text-lg text-gray-600">
            DailyDo removes friction from your day and replaces it with focus,
            structure, and momentum.
          </p>
        </div>

        {/* Problem vs Solution */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Problems */}
          <div className="bg-white/70 backdrop-blur-xl border border-red-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Common Problems
              </h3>
            </div>

            <div className="space-y-6">
              {problems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.problem}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Leads to stress and missed goals
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                DailyDo Solution
              </h3>
            </div>

            <div className="space-y-6">
              {problems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.solution}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Automated & effortless
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Real Results, Real Impact 📊
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-xl border border-gray-200
                           rounded-2xl p-7 text-center
                           hover:-translate-y-2 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${result.gradient}
                              flex items-center justify-center shadow-lg`}
                >
                  <result.icon className="w-7 h-7 text-white" />
                </div>

                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {result.value}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {result.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
