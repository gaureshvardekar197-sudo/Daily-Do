import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Trash2,
  CheckSquare,
  Square,
  AlertCircle,
  Clock,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import api from "../../api/axios";
import {
  getUserTasks,
  adminToggleTask,
  adminDeleteTask
} from "../../api/adminApi";

const UserTaskModal = ({ userId, userName, onClose, isAdmin = false }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");
  const [expandedTask, setExpandedTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let taskList = [];

      if (isAdmin && userId) {
        const response = await getUserTasks(userId);

        if (Array.isArray(response.data)) {
          taskList = response.data;
        } else if (response.data?.tasks) {
          taskList = response.data.tasks;
        }
      } else {
        const res = await api.get("/tasks");
        taskList = res.data;
      }

      setTasks(taskList || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId || !isAdmin) {
      fetchTasks();
    }
  }, [userId, isAdmin]);

  const handleToggleTask = async (taskId) => {
    try {
      if (isAdmin) {
        await adminToggleTask(taskId);
      } else {
        await api.patch(`/tasks/${taskId}/toggle`);
      }
      fetchTasks();
    } catch (error) {
      console.error("Toggle failed:", error);
      alert("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      if (isAdmin) {
        await adminDeleteTask(taskId);
      } else {
        await api.delete(`/tasks/${taskId}`);
      }
      fetchTasks();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete task");
    }
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

  const toggleExpandTask = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const getRecentTasks = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return tasks.filter(task => {
      const taskDate = new Date(task.created_at || task.createdAt);
      return !isNaN(taskDate) && taskDate >= sevenDaysAgo;
    });
  };

  const recentTasks = getRecentTasks();
  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);

  const getTasksByTab = () => {
    switch (activeTab) {
      case "recent": return recentTasks;
      case "all": return tasks;
      case "completed": return completedTasks;
      case "pending": return pendingTasks;
      default: return recentTasks;
    }
  };

  const currentTasks = getTasksByTab();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">

        <div className="p-5 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">
                {userName || "User"}'s Tasks
                {isAdmin && (
                  <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    Admin View
                  </span>
                )}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {tasks.length} tasks • {pendingTasks.length} pending • {completedTasks.length} completed
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            {[
              { id: "recent", label: "Recent", count: recentTasks.length },
              { id: "all", label: "All", count: tasks.length },
              { id: "pending", label: "Pending", count: pendingTasks.length },
              { id: "completed", label: "Completed", count: completedTasks.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {!loading && currentTasks.length === 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                <AlertCircle className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h4>
              <p className="text-gray-500">
                {activeTab === 'recent' ? 'No recent tasks in the last 7 days' : 
                 activeTab === 'all' ? 'No tasks available' :
                 activeTab === 'pending' ? 'No pending tasks' : 'No completed tasks'}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {currentTasks.map(task => (
              <div
                key={task.id}
                className="border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="flex-shrink-0 mt-1"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-green-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {task.title}
                      </div>

                      {task.description && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleExpandTask(task.id)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Description</span>
                            {expandedTask === task.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          
                          {expandedTask === task.id && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {task.description || "No description provided"}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(task.created_at || task.createdAt)}</span>
                        </div>

                        {task.priority && (
                          <div className={`text-xs px-2 py-1 rounded ${
                            task.priority === 'high' ? 'bg-red-100 text-red-800' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {task.priority}
                          </div>
                        )}

                        {task.day && (
                          <div className="text-xs text-gray-600">
                            {task.day}
                          </div>
                        )}

                        {task.completed ? (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            <span>Completed</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-amber-600">
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t text-sm text-gray-600 flex justify-between items-center">
          <span>
            Total: {tasks.length} | Pending: {pendingTasks.length} | Completed: {completedTasks.length}
          </span>
          <button 
            onClick={fetchTasks}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTaskModal;