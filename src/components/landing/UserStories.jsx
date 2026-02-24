import React from "react";
import {
  Star,
  Quote,
  TrendingUp,
  Target,
  Zap,
  Award,
} from "lucide-react";

const UserStories = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "DailyDo helped me increase my daily productivity by 40%. The auto-carry feature is a game-changer!",
      rating: 5,
      improvement: "40% more productive",
    },
    {
      name: "Michael Rodriguez",
      role: "Freelance Developer",
      company: "Self-Employed",
      content:
        "Managing multiple projects is easy now. Priority levels keep me focused every single day.",
      rating: 5,
      improvement: "Less task overload",
    },
    {
      name: "Priya Sharma",
      role: "Student",
      company: "University",
      content:
        "The daily completion percentage motivates me to finish tasks. Perfect for study planning.",
      rating: 5,
      improvement: "Better time management",
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: "5,000+",
      label: "Active Users",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      value: "92%",
      label: "Completion Rate",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      value: "2.5×",
      label: "Productivity Boost",
      gradient: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: Award,
      value: "4.8/5",
      label: "User Rating",
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <section
      id="users"
      className="relative py-24 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Productive People ❤️
          </h2>
          <p className="text-lg text-gray-600">
            Thousands trust DailyDo to organize their day and boost productivity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-xl border border-gray-200
                         rounded-2xl p-6 text-center
                         hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <div
                className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.gradient}
                            flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex flex-col items-center gap-3 mb-12">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Quote className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 text-center">
              What Users Say
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-xl border border-gray-200
                           rounded-2xl p-7
                           hover:-translate-y-2 hover:shadow-2xl transition-all"
              >
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  “{testimonial.content}”
                </p>

                {/* User */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500
                                  flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-5 inline-block bg-green-100 text-green-700
                                px-4 py-1 rounded-full text-xs font-semibold">
                  {testimonial.improvement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserStories;
