import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { 
  FaTrash, 
  FaCheckCircle, 
  FaRegCircle, 
  FaFilter, 
  FaSearch,
  FaCalendarAlt,
  FaFlag,
  FaCheck,
  FaClock,
  FaSync,
  FaExclamationTriangle,
  FaListUl,
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarPlus,
  FaAngleDown,
  FaAngleUp,
  FaCalendarDay
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../components/common/Pagination";

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [refreshing, setRefreshing] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [paginatedTasks, setPaginatedTasks] = useState([]);
  
  // Expanded descriptions state
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  
  // View mode state for mobile
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  
  const initialFetch = useRef(true);

  // Calculate pagination values
  const totalItems = filteredTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Fetch tasks
  const fetchTasks = async (showToast = false) => {
    try {
      setRefreshing(true);
      const res = await axios.get("http://127.0.0.1:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setTasks(res.data);
      setFilteredTasks(res.data);
      
      if (showToast && !initialFetch.current) {
        toast.success("Tasks refreshed successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      initialFetch.current = false;
    } catch (err) {
      setError("Failed to load tasks");
      if (showToast) {
        toast.error("Failed to refresh tasks", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial fetch without toast
    fetchTasks(false);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (filter === "completed") {
      result = result.filter(task => task.completed);
    } else if (filter === "pending") {
      result = result.filter(task => !task.completed);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          comparison = (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "date":
        default:
          // Sort by created_at date
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
          comparison = dateB - dateA;
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredTasks(result);
    setCurrentPage(1); // Reset to first page when filters change
    // Clear expanded descriptions when filters change
    setExpandedDescriptions({});
  }, [tasks, searchTerm, filter, sortBy, sortOrder]);

  // Update paginated tasks when filtered tasks or pagination changes
  useEffect(() => {
    const paginated = filteredTasks.slice(startIndex, endIndex);
    setPaginatedTasks(paginated);
  }, [filteredTasks, currentPage, itemsPerPage]);

  // Toggle description expansion
  const toggleDescription = (taskId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Check if description needs expansion
  // const isDescriptionLong = (description) => {
  //   return description && description.length > 100;
  // };

  //Check if description needs expansion
  const isDescriptionLong = (description) => {
  return description && description.length > 100;
};

  // Format date for display - optimized for created_at
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      
      // If less than 1 minute
      if (diffMinutes < 1) {
        return "Just now";
      }
      // If less than 1 hour
      else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      // If less than 24 hours
      else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      }
      // If less than 7 days
      else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      }
      // For older dates
      else {
        // Check if same year
        const isSameYear = date.getFullYear() === now.getFullYear();
        
        return date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: !isSameYear ? 'numeric' : undefined,
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date error";
    }
  };

  // Format date for detailed view
  const formatDetailedDate = (dateString) => {
    if (!dateString) return "Not available";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch (error) {
      return "Date error";
    }
  };

  // Get day label from enum value
  const getDayLabel = (day) => {
    switch (day) {
      case 'today':
        return 'Today';
      case 'tomorrow':
        return 'Tomorrow';
      case 'later':
        return 'Later';
      default:
        return 'Today';
    }
  };

  // Get priority label from enum value
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Medium';
    }
  };

  // Toggle completed
  const toggleTask = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const wasCompleted = task?.completed;
    
    try {
      // Optimistic update
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
      
      await axios.patch(
        `http://127.0.0.1:8000/api/tasks/${taskId}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // Show toast notification
      toast.success(
        wasCompleted ? "Task marked as pending!" : "Task completed successfully!",
        {
          position: "top-right",
          autoClose: 2000,
          icon: wasCompleted ? <FaExclamationTriangle /> : <FaCheckCircle />,
        }
      );
    } catch {
      // Revert optimistic update on error
      fetchTasks(false);
      toast.error("Failed to update task status", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!window.confirm(`Are you sure you want to delete "${task?.title}"?`)) return;

    try {
      // Optimistic update
      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      toast.success("Task deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch {
      // Revert optimistic update on error
      fetchTasks(false);
      toast.error("Failed to delete task", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Priority color and icon
  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-700",
          iconColor: "text-red-500",
          icon: <FaFlag />,
          label: "High"
        };
      case "medium":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-700",
          iconColor: "text-yellow-500",
          icon: <FaFlag />,
          label: "Medium"
        };
      case "low":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-700",
          iconColor: "text-green-500",
          icon: <FaFlag />,
          label: "Low"
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-700",
          iconColor: "text-gray-500",
          icon: <FaFlag />,
          label: "Medium"
        };
    }
  };

  // Status color
  const getStatusColor = (completed) => {
    return completed ? {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <FaCheck className="inline mr-1" />
    } : {
      bg: "bg-orange-100",
      text: "text-orange-700",
      icon: <FaClock className="inline mr-1" />
    };
  };

  // Day color
  const getDayColor = (day) => {
    switch (day) {
      case 'today':
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: <FaCalendarDay className="inline mr-1" />
        };
      case 'tomorrow':
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: <FaCalendarAlt className="inline mr-1" />
        };
      case 'later':
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: <FaCalendarAlt className="inline mr-1" />
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: <FaCalendarAlt className="inline mr-1" />
        };
    }
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(prev => prev === "grid" ? "list" : "grid");
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Stats for the header
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    today: tasks.filter(t => t.day === "today").length,
  };

  // Loading state
  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ToastContainer />
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ToastContainer />
        <div className="text-center p-8">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => fetchTasks(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">My TaskSheet</h1>
              <p className="text-sm md:text-base text-gray-600">Manage and organize your tasks efficiently</p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:flex md:items-center gap-3 md:gap-4 bg-white rounded-xl p-3 md:p-4 shadow-sm border">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-xs md:text-xs text-gray-500">Total</div>
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-xs md:text-xs text-gray-500">Done</div>
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-orange-600">{stats.pending}</div>
                <div className="text-xs md:text-xs text-gray-500">Pending</div>
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-purple-600">{stats.today}</div>
                <div className="text-xs md:text-xs text-gray-500">Today</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-between">
            <div className="relative w-full md:flex-1 md:max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto justify-center md:justify-end">
              {/* View Mode Toggle for mobile */}
              <button
                onClick={toggleViewMode}
                className="md:hidden px-3 py-2 border rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                title={viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
              >
                {viewMode === "grid" ? <FaListUl /> : <FaListUl />}
              </button>

              <select
                className="px-3 md:px-4 py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white flex-1 md:flex-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex items-center gap-1 md:gap-2">
                <select
                  className="px-3 md:px-4 py-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white flex-1 md:flex-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date (Newest)</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="title">Sort by Title</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition"
                  title={sortOrder === "asc" ? "Ascending" : "Descending"}
                >
                  {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
                </button>
              </div>

              <button
                onClick={() => fetchTasks(true)}
                disabled={refreshing}
                className={`px-4 md:px-5 py-2 md:py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2 font-medium text-sm md:text-base ${
                  refreshing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {refreshing ? (
                  <>
                    <FaSync className="animate-spin" />
                    <span className="hidden sm:inline">Refreshing...</span>
                  </>
                ) : (
                  <>
                    <FaSync />
                    <span className="hidden sm:inline">Refresh</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Container */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border overflow-hidden">
          {loading && refreshing ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-3 text-gray-600">Refreshing tasks...</p>
              </div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <div className="text-gray-400 text-5xl md:text-6xl mb-3 md:mb-4">📝</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
              <p className="text-gray-500 text-sm md:text-base">
                {searchTerm ? "Try a different search term" : "Create a new task to get started"}
              </p>
            </div>
          ) : (
            <>
              {/* Mobile View */}
              <div className={`${viewMode === "list" ? "block" : "hidden"} md:hidden divide-y`}>
                {paginatedTasks.map((task) => {
                  const priorityConfig = getPriorityConfig(task.priority);
                  const statusConfig = getStatusColor(task.completed);
                  const dayConfig = getDayColor(task.day);
                  const isExpanded = expandedDescriptions[task.id];
                  const needsExpansion = isDescriptionLong(task.description);
                  const displayDescription = isExpanded 
                    ? task.description || "No description provided."
                    : needsExpansion 
                      ? task.description.substring(0, 100) + "..."
                      : task.description || "No description provided.";
                  
                  return (
                    <div
                      key={task.id}
                      className={`p-4 ${priorityConfig.bgColor} hover:bg-opacity-80 transition-colors`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-2 flex-1">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition mt-1 flex-shrink-0 ${
                              task.completed
                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            }`}
                          >
                            {task.completed ? <FaCheckCircle size={16} /> : <FaRegCircle size={16} />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold truncate ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                              {task.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor}`}>
                                {priorityConfig.icon} {priorityConfig.label}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                {statusConfig.icon} {task.completed ? 'Done' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-gray-400 hover:text-red-500 flex-shrink-0 hover:bg-red-50 rounded-lg transition"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                      
                      <div className="pl-10">
                        <div className="mb-3">
                          <p className="text-gray-600 text-sm">
                            {displayDescription}
                          </p>
                          {needsExpansion && (
                            <button
                              onClick={() => toggleDescription(task.id)}
                              className="text-blue-500 hover:text-blue-600 text-xs font-medium mt-1 flex items-center gap-1"
                            >
                              {isExpanded ? (
                                <>
                                  <FaAngleUp /> Show Less
                                </>
                              ) : (
                                <>
                                  <FaAngleDown /> Read More
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-3 border-t gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-1 rounded flex items-center gap-1 ${dayConfig.bg} ${dayConfig.text}`}>
                              {dayConfig.icon} {getDayLabel(task.day)}
                            </span>
                            <span className="flex items-center gap-1 text-gray-600" title={formatDetailedDate(task.created_at)}>
                              <FaCalendarPlus className="text-gray-400" />
                              {formatDate(task.created_at)}
                            </span>
                          </div>
                          <span className="bg-gray-100 px-2 py-1 rounded font-medium">
                            ID: {task.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Grid View */}
              <div className={`${viewMode === "grid" ? "block" : "hidden"} md:grid gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3`}>
                {paginatedTasks.map((task) => {
                  const priorityConfig = getPriorityConfig(task.priority);
                  const statusConfig = getStatusColor(task.completed);
                  const dayConfig = getDayColor(task.day);
                  const isExpanded = expandedDescriptions[task.id];
                  const needsExpansion = isDescriptionLong(task.description);
                  const displayDescription = isExpanded 
                    ? task.description || "No description provided."
                    : needsExpansion 
                      ? task.description.substring(0, 100) + "..."
                      : task.description || "No description provided.";
                  
                  return (
                    <div
                      key={task.id}
                      className={`rounded-xl border ${priorityConfig.borderColor} transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col`}
                    >
                      <div className="p-4 md:p-5 border-b">
                        <div className="flex items-start justify-between mb-3 md:mb-4">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition mt-1 ${
                                task.completed
                                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                              }`}
                              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                            >
                              {task.completed ? <FaCheckCircle size={18} /> : <FaRegCircle size={18} />}
                            </button>
                            <div className="flex-1">
                              <h3
                                className={`font-semibold text-base md:text-lg mb-1 ${
                                  task.completed ? "line-through text-gray-500" : "text-gray-900"
                                }`}
                              >
                                {task.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${priorityConfig.bgColor} ${priorityConfig.textColor}`}>
                                  <span className={priorityConfig.iconColor}>
                                    {priorityConfig.icon}
                                  </span>
                                  {priorityConfig.label} Priority
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Delete task"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 md:p-5 flex-grow flex flex-col">
                        <div className="mb-4 md:mb-5 flex-grow">
                          <p className="text-gray-600 text-sm md:text-base">
                            {displayDescription}
                          </p>
                          {needsExpansion && (
                            <button
                              onClick={() => toggleDescription(task.id)}
                              className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              {isExpanded ? (
                                <>
                                  <FaAngleUp /> Show Less
                                </>
                              ) : (
                                <>
                                  <FaAngleDown /> Read More
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between text-sm pt-4 border-t gap-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 ${dayConfig.bg} ${dayConfig.text}`}>
                              {dayConfig.icon}
                              {getDayLabel(task.day)}
                            </div>
                            <div 
                              className="flex items-center gap-1.5 text-gray-600 text-xs md:text-sm cursor-help" 
                              title={`Created: ${formatDetailedDate(task.created_at)}`}
                            >
                              <FaCalendarPlus className="text-gray-400" />
                              {formatDate(task.created_at)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                              {statusConfig.icon}
                              {task.completed ? 'Completed' : 'Pending'}
                            </span>
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                              ID: {task.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Pagination Component */}
          {filteredTasks.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>

        {/* Summary Footer */}
        <div className="mt-4 md:mt-6 text-center text-gray-500 text-xs md:text-sm">
          {filteredTasks.length > 0 && (
            <>
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} tasks
              {searchTerm && ` • Searching for: "${searchTerm}"`}
              {viewMode === "list" ? " • List View" : " • Grid View"}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;