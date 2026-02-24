// import { useEffect, useState } from "react";
// import {
//   FaClipboardList,
//   FaCalendar,
//   FaExclamation,
//   FaChartPie,
// } from "react-icons/fa";
// import api from "../../api/axios";

// const UserDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch user tasks
//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/tasks");
//       setTasks(res.data);
//     } catch (error) {
//       console.error("Failed to fetch tasks", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // 🔢 Stats
//   const completionPercentage = tasks.length
//     ? Math.round(
//         (tasks.filter((t) => t.completed).length / tasks.length) * 100
//       )
//     : 0;

//   const todayTasks = tasks.filter((t) => t.day === "today");
//   const pendingTasks = tasks.filter((t) => !t.completed);

// if (loading) {
//   return (
//     <div className="flex items-center justify-center min-h-[400px]">
//       <div className="text-center">
//         <div className="relative inline-block">
//           <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
//           <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         <p className="mt-4 text-lg font-semibold text-gray-700">Loading your dashboard</p>
//         <p className="text-gray-500">Preparing your productivity insights...</p>
//       </div>
//     </div>
//   );
// }

//   return (
//     <div className="space-y-6">
//       {/* Welcome */}
//       <div className="bg-white rounded-2xl shadow p-6">
//   <h3 className="text-2xl font-bold">Welcome to DailyDo 👋</h3>
//   <p className="text-gray-600 mt-2">
//     Today's completion: {completionPercentage}%
//   </p>
// </div>


//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Tasks"
//           value={tasks.length}
//           color="blue"
//           icon={<FaClipboardList />}
//         />
//         <StatCard
//           title="Completion Rate"
//           value={`${completionPercentage}%`}
//           color="green"
//           icon={<FaChartPie />}
//         />
//         <StatCard
//           title="Pending Tasks"
//           value={pendingTasks.length}
//           color="red"
//           icon={<FaExclamation />}
//         />
//         <StatCard
//           title="Today's Tasks"
//           value={todayTasks.length}
//           color="yellow"
//           icon={<FaCalendar />}
//         />
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, color }) => {
//   const colors = {
//     blue: "border-blue-500 text-blue-600",
//     green: "border-green-500 text-green-600",
//     red: "border-red-500 text-red-600",
//     yellow: "border-yellow-500 text-yellow-600",
//   };

//   return (
//     <div
//       className={`bg-white p-6 rounded-2xl shadow border-l-4 ${colors[color]}`}
//     >
//       <p className="text-gray-500">{title}</p>
//       <h3 className="text-3xl font-bold">{value}</h3>
//       <div className="text-3xl mt-4">{icon}</div>
//     </div>
//   );
// };

// export default UserDashboard;

import { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaCalendar,
  FaExclamation,
  FaChartPie,
  FaSync,
  FaArrowRight
} from "react-icons/fa";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch user tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  // Calculate stats
  const today = new Date().toISOString().split('T')[0];
  
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const pendingTasks = tasks.filter((task) => !task.completed);
  const todayTasks = tasks.filter((task) => {
    if (task.dueDate) {
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      return taskDate === today;
    }
    return false;
  });

  // Get recent pending tasks (max 3)
  const recentPendingTasks = pendingTasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading your dashboard</p>
          <p className="text-gray-500">Preparing your productivity insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Overview of your productivity</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <FaSync className={`${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow p-6 text-white">
        <h3 className="text-2xl font-bold">Welcome to DailyDo 👋</h3>
        <p className="mt-2 opacity-90">
          You've completed {completedTasks} out of {totalTasks} tasks ({completionPercentage}%)
        </p>
        <div className="mt-4 w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <button 
          onClick={() => navigate('/user/tasks/new')}
          className="mt-6 flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add New Task
          <FaArrowRight />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          color="blue"
          icon={<FaClipboardList />}
          description="All your tasks"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionPercentage}%`}
          color="green"
          icon={<FaChartPie />}
          description="Overall progress"
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.length}
          color="red"
          icon={<FaExclamation />}
          description="Need attention"
        />
        <StatCard
          title="Today's Tasks"
          value={todayTasks.length}
          color="yellow"
          icon={<FaCalendar />}
          description="Due today"
        />
      </div>

      {/* Recent Pending Tasks */}
      {recentPendingTasks.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Pending Tasks</h3>
            <button 
              onClick={() => navigate('/user/tasks')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All
              <FaArrowRight className="text-xs" />
            </button>
          </div>
          <div className="space-y-3">
            {recentPendingTasks.map((task) => (
              <div key={task._id || task.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  {task.dueDate && (
                    <p className="text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-600' 
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {task.priority || 'normal'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color, description }) => {
  const colors = {
    blue: "border-blue-500 text-blue-600 bg-blue-50",
    green: "border-green-500 text-green-600 bg-green-50",
    red: "border-red-500 text-red-600 bg-red-50",
    yellow: "border-yellow-500 text-yellow-600 bg-yellow-50",
  };

  return (
    <div className={`bg-white p-6 rounded-2xl shadow border-l-4 ${colors[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
          {description && (
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <div className="text-3xl opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;