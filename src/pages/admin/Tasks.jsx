import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import { 
  Users, 
  Calendar, 
  AlertCircle, 
  RefreshCw,
  CheckCircle,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Loader2
} from "lucide-react";
import Pagination from "../../components/common/Pagination";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial load
  const [refreshing, setRefreshing] = useState(false); // New state for refresh
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedTask, setExpandedTask] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchTasks(false); // Initial fetch
  }, []);

  const fetchTasks = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      const res = await api.get("/admin/tasks");
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      setRefreshing(false);
    }
  };

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (statusFilter !== "all") {
      result = result.filter(task => {
        if (statusFilter === "completed") return task.completed === true;
        if (statusFilter === "pending") return task.completed === false;
        return true;
      });
    }

    if (priorityFilter !== "all") {
      result = result.filter(task => 
        task.priority?.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at || a.createdAt);
      const dateB = new Date(b.created_at || b.createdAt);
      
      switch (sortBy) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "priority":
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          const aPriority = priorityOrder[a.priority?.toLowerCase()] || 4;
          const bPriority = priorityOrder[b.priority?.toLowerCase()] || 4;
          return aPriority - bPriority;
        default:
          return dateB - dateA;
      }
    });

    return result;
  }, [tasks, statusFilter, priorityFilter, sortBy]);

  // Get paginated tasks
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredTasks.length / itemsPerPage);
  }, [filteredTasks.length, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, priorityFilter, sortBy]);

  // Stats
  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority?.toLowerCase() === "high").length,
    medium: tasks.filter(t => t.priority?.toLowerCase() === "medium").length,
    low: tasks.filter(t => t.priority?.toLowerCase() === "low").length,
  }), [tasks]);

  const toggleExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" };
      case "medium":
        return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" };
      case "low":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-500" };
    }
  };

  const getStatusColor = (completed) => {
    return completed
      ? { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" }
      : { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" };
  };

  const getStatusColorCompact = (status) => {
    switch (status) {
      case "completed": return "bg-emerald-100 text-emerald-800";
      case "pending": return "bg-amber-100 text-amber-800";
      default: return "bg-indigo-100 text-indigo-800";
    }
  };

  const getPriorityColorCompact = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-indigo-100 text-indigo-800";
    }
  };

  const statsCards = [
    { 
      label: "Total Tasks", 
      value: initialLoading ? "--" : stats.total, 
      icon: Users, 
      color: "bg-blue-50 text-blue-600",
      loading: initialLoading
    },
    { 
      label: "Completed", 
      value: initialLoading ? "--" : stats.completed, 
      icon: CheckCircle, 
      color: "bg-emerald-50 text-emerald-600",
      loading: initialLoading
    },
    { 
      label: "Pending", 
      value: initialLoading ? "--" : stats.pending, 
      icon: Clock, 
      color: "bg-amber-50 text-amber-600",
      loading: initialLoading
    },
    { 
      label: "High Priority", 
      value: initialLoading ? "--" : stats.high, 
      icon: AlertCircle, 
      color: "bg-red-50 text-red-600",
      loading: initialLoading
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortBy("newest");
  };

  // Full page loader for initial loading
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg">
                <Calendar className="text-white w-8 h-8" />
              </div>
              <div className="absolute -top-2 -right-2 bg-white border-2 border-indigo-600 text-indigo-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
                ?
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Tasks
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch all tasks...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Tasks</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchTasks(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filters Sidebar */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Filters</h2>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto h-full">
              {/* Active Filters */}
              {(statusFilter !== "all" || priorityFilter !== "all" || sortBy !== "newest") && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">Active Filters</h3>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {statusFilter !== "all" && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColorCompact(statusFilter)}`}>
                        Status: {statusFilter}
                      </span>
                    )}
                    {priorityFilter !== "all" && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColorCompact(priorityFilter)}`}>
                        Priority: {priorityFilter}
                      </span>
                    )}
                    {sortBy !== "newest" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Sort: {sortBy === "oldest" ? "Oldest First" : "Priority"}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Status Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Status</h3>
                <div className="space-y-2">
                  {["all", "completed", "pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        statusFilter === status
                          ? status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-indigo-100 text-indigo-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Priority Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Priority</h3>
                <div className="space-y-2">
                  {["all", "high", "medium", "low"].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => {
                        setPriorityFilter(priority);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        priorityFilter === priority
                          ? priority === "high"
                            ? "bg-red-100 text-red-700"
                            : priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : priority === "low"
                            ? "bg-green-100 text-green-700"
                            : "bg-indigo-100 text-indigo-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {priority === "all" ? "All Priorities" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort By */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Sort By</h3>
                <div className="space-y-2">
                  {["newest", "oldest", "priority"].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => {
                        setSortBy(sort);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        sortBy === sort
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {sort === "newest" ? "Newest First" : 
                       sort === "oldest" ? "Oldest First" : 
                       "Priority"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="text-sm text-gray-600 mb-2">Showing Results</div>
                <div className="text-lg font-bold text-gray-900">
                  {filteredTasks.length} of {tasks.length} tasks
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mobile Filter Button */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          disabled={refreshing}
        >
          <Filter className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-3 bg-indigo-600 rounded-xl sm:rounded-2xl shadow">
                    <Calendar className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
                    {stats.total}
                  </div>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    All Tasks
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Total: {stats.total} tasks • Completed: {stats.completed} • Pending: {stats.pending}
                  </p>
                </div>
              </div>
              
              <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => fetchTasks(true)}
                  disabled={refreshing}
                  className={`px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 flex items-center gap-2 ${
                    refreshing ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {refreshing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
                </button>
              </div>
            </div>

            {/* Active Filters Bar */}
            {(statusFilter !== "all" || priorityFilter !== "all" || sortBy !== "newest") && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {statusFilter !== "all" && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColorCompact(statusFilter)}`}>
                      Status: {statusFilter}
                      <button 
                        onClick={() => setStatusFilter("all")}
                        className="ml-1.5 hover:text-gray-900"
                        disabled={refreshing}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {priorityFilter !== "all" && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColorCompact(priorityFilter)}`}>
                      Priority: {priorityFilter}
                      <button 
                        onClick={() => setPriorityFilter("all")}
                        className="ml-1.5 hover:text-gray-900"
                        disabled={refreshing}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {sortBy !== "newest" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Sort: {sortBy === "oldest" ? "Oldest First" : "Priority"}
                      <button 
                        onClick={() => setSortBy("newest")}
                        className="ml-1.5 hover:text-indigo-900"
                        disabled={refreshing}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                    disabled={refreshing}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {statsCards.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                <div>
                  {stat.loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-12 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ) : (
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:block bg-white rounded-2xl border p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {["all", "completed", "pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      disabled={refreshing}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        statusFilter === status
                          ? status === "completed"
                            ? "bg-emerald-600 text-white shadow"
                            : status === "pending"
                            ? "bg-amber-600 text-white shadow"
                            : "bg-indigo-600 text-white shadow"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } ${refreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Priority
                </label>
                <div className="flex flex-wrap gap-2">
                  {["all", "high", "medium", "low"].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setPriorityFilter(priority)}
                      disabled={refreshing}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        priorityFilter === priority
                          ? priority === "high"
                            ? "bg-red-600 text-white shadow"
                            : priority === "medium"
                            ? "bg-yellow-600 text-white shadow"
                            : priority === "low"
                            ? "bg-green-600 text-white shadow"
                            : "bg-indigo-600 text-white shadow"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } ${refreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {priority === "all" ? "All Priorities" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sort By
                </label>
                <div className="flex flex-wrap gap-2">
                  {["newest", "oldest", "priority"].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      disabled={refreshing}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        sortBy === sort
                          ? "bg-indigo-600 text-white shadow"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } ${refreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {sort === "newest" ? "Newest First" : 
                       sort === "oldest" ? "Oldest First" : 
                       "Priority"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tasks List Container */}
          <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
            {refreshing ? (
              // Refresh loader (lighter than initial load)
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Refreshing Tasks
                </h3>
                <p className="text-gray-500">
                  Updating task data...
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 mb-4">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                  {tasks.length === 0 ? "No tasks found" : "No tasks match your filters"}
                </h3>
                <p className="text-gray-500 text-sm md:text-base max-w-sm mx-auto px-4 mb-4">
                  {tasks.length === 0 
                    ? "There are no tasks in the system yet."
                    : "Try adjusting your filters to see more results."
                  }
                </p>
                {(statusFilter !== "all" || priorityFilter !== "all") && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Task
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Day
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedTasks.map((task) => {
                        const priorityColors = getPriorityColor(task.priority);
                        const statusColors = getStatusColor(task.completed);
                        
                        return (
                          <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <span className="font-medium text-indigo-600">
                                    {task.user?.name?.charAt(0) || "U"}
                                  </span>
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {task.user?.name || "Unknown User"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {task.user?.email || ""}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {task.title}
                              </div>
                              {task.description && (
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {task.description}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {task.day || "Today"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityColors.bg} ${priorityColors.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${priorityColors.dot}`}></span>
                                {task.priority || "Medium"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusColors.dot}`}></span>
                                {task.completed ? "Completed" : "Pending"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {formatDate(task.created_at || task.createdAt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden">
                  {paginatedTasks.map((task) => {
                    const priorityColors = getPriorityColor(task.priority);
                    const statusColors = getStatusColor(task.completed);
                    const isExpanded = expandedTask === task.id;
                    
                    return (
                      <div key={task.id} className="border-b last:border-b-0">
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <span className="font-medium text-indigo-600">
                                  {task.user?.name?.charAt(0) || "U"}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900 truncate">
                                    {task.user?.name || "Unknown User"}
                                  </span>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1 ${statusColors.dot}`}></span>
                                    {task.completed ? "Done" : "Pending"}
                                  </span>
                                </div>
                                <h3 className="font-medium text-gray-900 mb-1">
                                  {task.title}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded ${priorityColors.bg} ${priorityColors.text}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1 ${priorityColors.dot}`}></span>
                                    {task.priority || "Medium"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {task.day || "Today"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleExpand(task.id)}
                              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 ml-1"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t">
                              {task.description && (
                                <div className="mb-3">
                                  <div className="text-xs text-gray-500 mb-1">Description</div>
                                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    {task.description}
                                  </p>
                                </div>
                              )}
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <div className="text-xs text-gray-500">Created</div>
                                  <div className="font-medium">{formatDate(task.created_at || task.createdAt)}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Priority</div>
                                  <div className={`font-medium ${priorityColors.text}`}>
                                    {task.priority || "Medium"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Pagination - Only show if there are tasks */}
            {filteredTasks.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredTasks.length}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;