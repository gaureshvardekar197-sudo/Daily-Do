import { useEffect, useState } from "react";
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Percent, 
  AlertCircle,
  RefreshCw,
  Sparkles
} from "lucide-react";
import api from "../../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    totalTasks: 0,
    completedToday: 0,
    completionPercentage: 0,
    pendingTasks: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [adminName, setAdminName] = useState("");
  // const [adminEmail, setAdminEmail] = useState("");

  // Fetch admin profile data
  const fetchAdminProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setAdminName(res.data.name || "Admin");
      // setAdminEmail(res.data.email || "admin@example.com");
    } catch (error) {
      console.error("Failed to fetch admin profile", error);
      // Fallback to localStorage if API fails
      const name = localStorage.getItem("adminName") || "Admin";
      setAdminName(name);
    }
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch admin profile first
      await fetchAdminProfile();
      
      // Then fetch dashboard stats
      const [usersRes, tasksRes, statsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/tasks"),
        api.get("/admin/stats"),
      ]);

      const users = usersRes.data || [];
      const tasks = tasksRes.data || [];
      
      // Calculate additional stats
      const activeUsers = users.filter(user => user.status === 'active').length;
      const completedTasks = tasks.filter(task => task.completed).length;
      const pendingTasks = tasks.filter(task => !task.completed).length;
      const completionPercentage = tasks.length > 0 
        ? Math.round((completedTasks / tasks.length) * 100) 
        : 0;

      setStats({
        users: users.length,
        totalTasks: tasks.length,
        completedToday: statsRes.data?.completed || 0,
        completionPercentage,
        pendingTasks,
        activeUsers,
      });
    } catch (err) {
      console.error("Admin dashboard error", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      subtitle: `${stats.activeUsers} active`,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-100",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      subtitle: `${stats.pendingTasks} pending`,
      icon: Calendar,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-100",
    },
    {
      title: "Completed Today",
      value: stats.completedToday,
      subtitle: "Tasks completed",
      icon: CheckCircle,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-100",
    },
    {
      title: "Completion Rate",
      value: `${stats.completionPercentage}%`,
      subtitle: "Overall completion",
      icon: Percent,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-100",
    },
  ];

  // **INITIAL LOADER - Shows when admin first logs in**
  if (initialLoad) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        {/* Animated Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </div>
          
          {/* Outer ring animation */}
          <div className="absolute inset-0 border-4 border-indigo-200 rounded-2xl animate-ping opacity-20"></div>
          
          {/* Inner ring animation */}
          <div className="absolute inset-0 border-2 border-purple-300 rounded-2xl animate-ping opacity-30"></div>
        </div>

        {/* Loading Text with Animation */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {adminName || "Admin"}!
          </h1>
          {/* {adminEmail && (
            <p className="text-gray-500 text-sm">
              Logged in as: {adminEmail}
            </p>
          )} */}
          <p className="text-gray-600 text-lg mb-6">
            Preparing your dashboard...
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-progress"></div>
          </div>
          
          {/* Dots Animation */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
          
          {/* Subtext */}
          <p className="text-gray-500 text-sm mt-8">
            Loading your analytics and insights...
          </p>
        </div>
      </div>
    );
  }

  // **SKELETON LOADER - Shows when refreshing data after initial load**
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Welcome Card Skeleton */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-3">
              <div className="h-7 bg-gray-300 rounded w-64"></div>
              <div className="h-4 bg-gray-300 rounded w-80"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded-lg w-32 mt-4 md:mt-0"></div>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-3">
            <div className="h-9 bg-gray-300 rounded w-56"></div>
            <div className="h-4 bg-gray-300 rounded w-72"></div>
          </div>
          <div className="h-11 bg-gray-300 rounded-xl w-32"></div>
        </div>

        {/* Stats Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-9 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
              </div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>

        {/* Insights Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="h-6 bg-gray-300 rounded w-40 mb-6"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-2 bg-gray-300 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-2 bg-gray-300 rounded-full"></div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchDashboard}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card with Admin Name from API */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <h3 className="text-xl font-bold">Welcome back, {adminName}!</h3>
            </div>
            <p className="text-indigo-100 mb-4 md:mb-0">
              You're managing {stats.users} users and {stats.totalTasks} tasks with {stats.completionPercentage}% completion rate.
            </p>
            {/* {adminEmail && (
              <p className="text-indigo-200 text-sm mt-1">
                Logged in as: {adminEmail}
              </p>
            )} */}
          </div>
          <button
            onClick={fetchDashboard}
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time insights and performance metrics for {adminName}
          </p>
        </div>
        <button
          onClick={fetchDashboard}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-2xl border ${card.borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">
                {card.value}
              </p>
              <p className="text-sm text-gray-600 font-medium">
                {card.title}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {card.subtitle}
              </p>
            </div>

            {/* Progress Bar for Completion Rate */}
            {card.title === "Completion Rate" && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{stats.completionPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700"
                    style={{ width: `${stats.completionPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="font-semibold text-gray-900">{stats.activeUsers}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Active Rate</p>
                <p className="font-semibold text-emerald-600">
                  {stats.users > 0 ? Math.round((stats.activeUsers / stats.users) * 100) : 0}%
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Tasks</p>
                  <p className="font-semibold text-gray-900">{stats.pendingTasks}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Pending Rate</p>
                <p className="font-semibold text-amber-600">
                  {stats.totalTasks > 0 ? Math.round((stats.pendingTasks / stats.totalTasks) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Task Completion</span>
                <span>{stats.completionPercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700"
                  style={{ width: `${stats.completionPercentage}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>User Engagement</span>
                <span>{stats.users > 0 ? Math.round((stats.activeUsers / stats.users) * 100) : 0}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                  style={{ width: `${stats.users > 0 ? (stats.activeUsers / stats.users) * 100 : 0}%` }}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
                  <p className="text-sm text-gray-600">Today's Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;