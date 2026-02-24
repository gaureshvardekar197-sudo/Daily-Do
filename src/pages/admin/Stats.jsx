import { useEffect, useState } from "react";
import api from "../../api/axios";
import { 
  CheckCircle, 
  ClipboardList, 
  TrendingUp,
  RefreshCw,
  AlertCircle,
  BarChart3,
  Target,
  Clock,
  Sparkles,
  Calendar
} from "lucide-react";

const Stats = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("today");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.get("/admin/tasks");
      console.log("Tasks API Response:", res.data);
      setTasks(res.data || []);
      
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
      
      // Fallback demo data
      setTasks([
        { id: 1, title: "Complete project report", completed: true, priority: "high", created_at: new Date().toISOString() },
        { id: 2, title: "Update user documentation", completed: false, priority: "medium", created_at: new Date().toISOString() },
        { id: 3, title: "Fix login bug", completed: true, priority: "high", created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 4, title: "Design dashboard", completed: false, priority: "low", created_at: new Date(Date.now() - 172800000).toISOString() },
      ]);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [timeRange]);

  // Calculate stats from tasks data
  const calculateStats = () => {
    if (!tasks.length) {
      return {
        total: 0,
        completed: 0,
        pending: 0,
        percentage: 0,
        highPriority: 0,
        mediumPriority: 0,
        lowPriority: 0,
        averageDaily: 0,
        streak: 0,
        trend: 0,
        todayTotal: 0,
        todayCompleted: 0
      };
    }

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Priority stats
    const highPriority = tasks.filter(task => task.priority?.toLowerCase() === "high").length;
    const mediumPriority = tasks.filter(task => task.priority?.toLowerCase() === "medium").length;
    const lowPriority = tasks.filter(task => task.priority?.toLowerCase() === "low").length;
    
    // Today's tasks
    const today = new Date().toDateString();
    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.created_at || task.createdAt);
      return taskDate.toDateString() === today;
    });
    const todayTotal = todayTasks.length;
    const todayCompleted = todayTasks.filter(task => task.completed).length;
    
    // Average daily completion
    const averageDaily = Math.round(completed / 7);
    
    // Streak calculation
    const datesWithCompletions = new Set(
      tasks
        .filter(task => task.completed)
        .map(task => new Date(task.completed_at || task.updated_at || task.created_at).toDateString())
    );
    const streak = datesWithCompletions.size;
    
    // Trend calculation
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayTasks = tasks.filter(task => {
      const taskDate = new Date(task.created_at || task.createdAt);
      return taskDate.toDateString() === yesterday.toDateString();
    });
    const yesterdayCompleted = yesterdayTasks.filter(task => task.completed).length;
    const trend = yesterdayCompleted > 0 
      ? Math.round(((todayCompleted - yesterdayCompleted) / yesterdayCompleted) * 100)
      : 0;

    return {
      total,
      completed,
      pending,
      percentage,
      highPriority,
      mediumPriority,
      lowPriority,
      averageDaily,
      streak,
      trend,
      todayTotal,
      todayCompleted,
      tasks
    };
  };

  // Get time range stats
  const getTimeRangeStats = () => {
    const stats = calculateStats();
    
    if (!stats.tasks || !stats.tasks.length) {
      return {
        total: 0,
        completed: 0,
        pending: 0,
        percentage: 0
      };
    }

    const now = new Date();
    let filteredTasks = [...stats.tasks];

    if (timeRange === "today") {
      const today = now.toDateString();
      filteredTasks = filteredTasks.filter(task => {
        const taskDate = new Date(task.created_at || task.createdAt);
        return taskDate.toDateString() === today;
      });
    } else if (timeRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filteredTasks = filteredTasks.filter(task => {
        const taskDate = new Date(task.created_at || task.createdAt);
        return taskDate >= weekAgo;
      });
    } else if (timeRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filteredTasks = filteredTasks.filter(task => {
        const taskDate = new Date(task.created_at || task.createdAt);
        return taskDate >= monthAgo;
      });
    }

    const total = filteredTasks.length;
    const completed = filteredTasks.filter(task => task.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      percentage
    };
  };

  // Get time range label
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "today": return "Today";
      case "week": return "This Week";
      case "month": return "This Month";
      default: return "All";
    }
  };

  // **INITIAL LOADER**
  if (initialLoad) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8">
        <div className="relative mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-white animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Loading Task Analytics</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Gathering insights from your tasks...
          </p>
          
          <div className="w-48 md:w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  // **SKELETON LOADER**
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 rounded-2xl shadow-xl border border-gray-100 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="space-y-3">
            <div className="h-6 md:h-8 bg-gray-300 rounded w-32 md:w-48"></div>
            <div className="h-3 md:h-4 bg-gray-300 rounded w-48 md:w-64"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 md:h-10 bg-gray-300 rounded-lg w-20 md:w-24"></div>
            <div className="h-8 md:h-10 bg-gray-300 rounded-lg w-28 md:w-32"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 p-4 md:p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-xl"></div>
                <div className="h-5 md:h-6 bg-gray-300 rounded-full w-12 md:w-16"></div>
              </div>
              <div className="h-3 md:h-4 bg-gray-300 rounded w-20 md:w-24 mb-3 md:mb-4"></div>
              <div className="h-8 md:h-12 bg-gray-300 rounded w-24 md:w-32 mb-3 md:mb-4"></div>
              <div className="h-2 md:h-3 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>

        <div className="pt-6 md:pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="h-4 md:h-5 bg-gray-300 rounded w-32 md:w-40 mb-3 md:mb-4"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !tasks.length) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center justify-center py-8 md:py-12">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mb-4 md:mb-6">
            <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Unable to Load Statistics</h3>
          <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base max-w-xs md:max-w-md">{error}</p>
          <button
            onClick={fetchTasks}
            className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 md:gap-3 text-sm md:text-base"
          >
            <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate dynamic stats
  const overallStats = calculateStats();
  const timeRangeStats = getTimeRangeStats();
  const completionPercentage = timeRangeStats.percentage;
  const pendingTasks = timeRangeStats.pending;

  // Performance message
  const getPerformanceMessage = () => {
    if (completionPercentage >= 80) return "🎯 Excellent performance! Keep up the great work.";
    if (completionPercentage >= 60) return "📈 Good progress! Maintain consistency.";
    if (completionPercentage >= 40) return "📊 Average performance. Focus on completion.";
    return "⚡ Needs improvement. Prioritize pending tasks.";
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Task Analytics</h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Total: {overallStats.total} tasks • {overallStats.completed} completed
          </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Time Range - Scrollable */}
          <div className="md:hidden flex overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex space-x-1 min-w-max">
              {["today", "week", "month", "all"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                    timeRange === range
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {range === "all" ? "All" : range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Desktop Time Range */}
          <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
            {["today", "week", "month", "all"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-all ${
                  timeRange === range
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {range === "all" ? "All Time" : range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          
          <button
            onClick={fetchTasks}
            className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm text-xs md:text-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        {/* Total Tasks Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl border border-blue-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
            <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl shadow">
              <ClipboardList className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
              {getTimeRangeLabel()}
            </span>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-2 md:mb-3">Total Tasks</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-0.5 md:mb-1">{timeRangeStats.total}</p>
              <p className="text-xs text-gray-500">Tasks created</p>
            </div>
            <div className="p-1.5 md:p-2 bg-white rounded-lg border border-blue-100">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl border border-emerald-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
            <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg md:rounded-xl shadow">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
              {timeRange === "today" ? "Today" : "Done"}
            </span>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-2 md:mb-3">Completed</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-0.5 md:mb-1">{timeRangeStats.completed}</p>
              <p className="text-xs text-gray-500">Successfully done</p>
            </div>
            <div className="p-1.5 md:p-2 bg-white rounded-lg border border-emerald-100">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl border border-orange-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
            <div className="p-2 md:p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg md:rounded-xl shadow">
              <Clock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
              Pending
            </span>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-2 md:mb-3">Pending</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-0.5 md:mb-1">{pendingTasks}</p>
              <p className="text-xs text-gray-500">Awaiting</p>
            </div>
            <div className="text-right">
              <div className="text-base md:text-lg lg:text-xl font-bold text-amber-600">
                {timeRangeStats.total > 0 ? Math.round((pendingTasks / timeRangeStats.total) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-500">of total</div>
            </div>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl border border-violet-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
            <div className="p-2 md:p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg md:rounded-xl shadow">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
              Rate
            </span>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-2 md:mb-3">Completion Rate</h3>
          <div className="flex items-end justify-between mb-2 md:mb-3 lg:mb-4">
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-0.5 md:mb-1">{completionPercentage}<span className="text-lg md:text-xl">%</span></p>
              <p className="text-xs text-gray-500">Success rate</p>
            </div>
            <div className={`text-lg md:text-xl lg:text-2xl ${completionPercentage >= 75 ? 'text-green-600' : completionPercentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
              {completionPercentage >= 75 ? '🔥' : completionPercentage >= 50 ? '👍' : '⚡'}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 md:mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1.5 md:mb-2">
              <span>Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2 lg:h-2.5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-violet-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(completionPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights Only (Task Summary Removed) */}
      <div className="pt-6 md:pt-8 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-blue-200">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800">Performance Insights</h4>
          </div>
          <p className="text-gray-700 text-sm md:text-base mb-4 md:mb-6">
            {getPerformanceMessage()}
          </p>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white p-2.5 md:p-3 rounded-lg border border-blue-100">
              <div className="text-xs text-gray-500 mb-1 md:mb-2">Daily Average</div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                {overallStats.averageDaily}
              </div>
            </div>
            
            <div className="bg-white p-2.5 md:p-3 rounded-lg border border-blue-100">
              <div className="text-xs text-gray-500 mb-1 md:mb-2">Success Streak</div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                {overallStats.streak} days
              </div>
            </div>
          </div>
          
          {/* Priority Distribution - Compact for mobile */}
          <div className="mt-4 md:mt-6 p-2.5 md:p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-xs text-gray-600 mb-1.5 md:mb-2">Priority Distribution</div>
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500"></div>
                <span className="text-xs">High: {overallStats.highPriority}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Medium: {overallStats.mediumPriority}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500"></div>
                <span className="text-xs">Low: {overallStats.lowPriority}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;