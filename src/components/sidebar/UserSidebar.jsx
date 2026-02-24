// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { 
//   FaHome, 
//   FaTasks, 
//   FaPlus, 
//   FaEye, 
//   FaChevronDown, 
//   FaSignOutAlt, 
//   FaTimes, 
//   FaBars,
//   FaEnvelope 
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// const UserSidebar = () => {
//   const [taskOpen, setTaskOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [windowHeight, setWindowHeight] = useState(window.innerHeight);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/user/profile");
//         setUser(res.data);
//       } catch (error) {
//         console.error("Failed to fetch user", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Update window height on resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowHeight(window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   // Get user initials for avatar
//   const getUserInitials = () => {
//     if (!user?.name) return "U";
//     return user.name
//       .split(" ")
//       .map(word => word.charAt(0))
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <>
//       {/* Mobile Header with Hamburger Menu */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16">
//         <div className="flex items-center justify-between px-4 h-full">
//           <button 
//             onClick={() => setIsSidebarOpen(true)}
//             className="text-gray-700 hover:text-gray-900 p-2"
//           >
//             <FaBars size={20} />
//           </button>
          
//           <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          
//           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
//             {getUserInitials()}
//           </div>
//         </div>
//       </div>

//       {/* Sidebar - Full height flexible layout */}
//       <div className={`
//         fixed lg:sticky
//         top-0 lg:top-0
//         left-0
//         z-50
//         bg-white
//         w-64
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         border-r border-gray-200
//         shadow-xl lg:shadow-sm
//         transition-transform duration-300
//         flex flex-col
//         overflow-hidden
//         h-screen lg:h-screen /* Full screen height */
//         mt-0 /* No top margin */
//       `}>
        
//         {/* Close Button (Mobile Only) */}
//         <button
//           onClick={() => setIsSidebarOpen(false)}
//           className="absolute top-4 right-4 lg:hidden text-gray-600 hover:text-gray-900 p-2 bg-white rounded-full shadow-sm z-10"
//         >
//           <FaTimes size={20} />
//         </button>

//         {/* Logo Section */}
//         <div className="px-5 py-5 border-b border-gray-200 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
//               <span className="text-lg font-bold text-white">DD</span>
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-gray-800">DailyDo</h1>
//               <p className="text-xs text-gray-500">Task Management</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Navigation Area - Flexible middle section */}
//         <div className="flex-1 overflow-y-auto">
//           <nav className="p-4">
//             {/* Dashboard */}
//             <NavLink 
//               to="/user/dashboard" 
//               className={({ isActive }) => 
//                 `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
//                   isActive 
//                   ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500" 
//                   : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
//                 }`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaHome className="mr-3 text-lg" />
//               <span className="font-medium">Dashboard</span>
//             </NavLink>

//             {/* Tasks Main Menu */}
//             <div className="mb-2">
//               <button
//                 onClick={() => setTaskOpen(!taskOpen)}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
//               >
//                 <div className="flex items-center">
//                   <FaTasks className="mr-3 text-lg" />
//                   <span className="font-medium">Tasks</span>
//                 </div>
//                 <FaChevronDown className={`transition-transform duration-200 ${taskOpen ? "rotate-180" : ""}`} />
//               </button>

//               {/* Task Submenu */}
//               {taskOpen && (
//                 <div className="ml-4 mt-1 pl-4 border-l-2 border-gray-100">
//                   <NavLink 
//                     to="/user/tasks/new" 
//                     className={({ isActive }) => 
//                       `flex items-center px-4 py-2.5 mb-1 rounded-lg transition-colors ${
//                         isActive 
//                         ? "text-blue-600 bg-blue-50" 
//                         : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                       }`
//                     }
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <FaPlus className="mr-3 text-sm" />
//                     <span>New Task</span>
//                   </NavLink>

//                   <NavLink 
//                     to="/user/tasks" 
//                     className={({ isActive }) => 
//                       `flex items-center px-4 py-2.5 rounded-lg transition-colors ${
//                         isActive 
//                         ? "text-blue-600 bg-blue-50" 
//                         : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                       }`
//                     }
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <FaEye className="mr-3 text-sm" />
//                     <span>View Tasks</span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             {/* Additional space for flexibility */}
//             {/* <div className="mt-8 px-2">
//               <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
//                 Quick Stats
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-gray-600">Today's Tasks</span>
//                   <span className="font-medium text-blue-600">5</span>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-gray-600">Completed</span>
//                   <span className="font-medium text-green-600">12</span>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-gray-600">Pending</span>
//                   <span className="font-medium text-orange-600">3</span>
//                 </div>
//               </div>
//             </div> */}
//           </nav>
//         </div>

//         {/* User Info & Logout Section - Fixed at bottom */}
//         <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
//           {loading ? (
//             // Loading skeleton
//             <div className="animate-pulse">
//               <div className="flex items-center mb-3">
//                 <div className="w-10 h-10 rounded-full bg-gray-200"></div>
//                 <div className="ml-3 space-y-2">
//                   <div className="h-3 w-24 bg-gray-200 rounded"></div>
//                   <div className="h-2 w-32 bg-gray-200 rounded"></div>
//                 </div>
//               </div>
//               <div className="h-10 bg-gray-200 rounded-lg"></div>
//             </div>
//           ) : (
//             <>
              // {/* User Info */}
              // <div className="flex items-center mb-3">
              //   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              //     {getUserInitials()}
              //   </div>
              //   <div className="ml-3 min-w-0">
              //     <p className="text-sm font-medium text-gray-800 truncate">
              //       {user?.name || "User Account"}
              //     </p>
              //     <p className="text-xs text-gray-500 truncate flex items-center gap-1">
              //       <FaEnvelope className="text-xs" />
              //       {user?.email || "user@example.com"}
              //     </p>
              //   </div>
              // </div>

//               {/* Logout Button */}
//               <button 
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium border border-red-100"
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default UserSidebar;

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaTasks, 
  FaPlus, 
  FaEye, 
  FaChevronDown, 
  FaSignOutAlt, 
  FaTimes, 
  FaBars,
  FaEnvelope,
  FaClipboardList,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast"; // Import toast

const UserSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [taskOpen, setTaskOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    todayTasks: 0,
    completionPercentage: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch task stats for sidebar
  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        setLoadingStats(true);
        const res = await api.get("/tasks");
        const tasks = res.data;
        
        const today = new Date().toISOString().split('T')[0];
        
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task) => task.completed).length;
        const pendingTasks = tasks.filter((task) => !task.completed).length;
        const todayTasks = tasks.filter((task) => {
          if (task.dueDate) {
            const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
            return taskDate === today;
          }
          return false;
        }).length;
        const completionPercentage = totalTasks > 0 
          ? Math.round((completedTasks / totalTasks) * 100)
          : 0;

        setTaskStats({
          totalTasks,
          completedTasks,
          pendingTasks,
          todayTasks,
          completionPercentage
        });
      } catch (error) {
        console.error("Failed to fetch task stats", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchTaskStats();
    const intervalId = setInterval(fetchTaskStats, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Update window height on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Show loading toast
      const loadingToast = toast.loading('Logging out...');
      
      // Optional: Call logout API if you have one
      // await api.post("/auth/logout");
      
      // Clear local storage
      localStorage.clear();
      
      // Update toast to success
      toast.dismiss(loadingToast);
      toast.success('Logged out successfully!', {
        duration: 3000,
        icon: '👋',
      });
      
      // Navigate to login page
      navigate("/login", { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Failed to logout. Please try again.', {
        duration: 4000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Alternative simpler logout with toast
  const handleLogoutSimple = () => {
    // Show confirmation toast
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Are you sure you want to logout?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performLogout();
            }}
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
    });
  };

  // Actual logout function
  const performLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!', {
      duration: 3000,
      icon: '👋',
      position: 'top-center',
    });
    navigate("/login", { replace: true });
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile Header with Hamburger Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16">
        <div className="flex items-center justify-between px-4 h-full">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700 hover:text-gray-900 p-2"
          >
            <FaBars size={20} />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          
          <div className="flex items-center gap-2">
            {!loadingStats && (
              <div className="hidden sm:flex items-center gap-2 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                <FaCheckCircle className="text-xs" />
                <span>{taskStats.completedTasks}/{taskStats.totalTasks}</span>
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {getUserInitials()}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Full height flexible layout */}
      <div className={`
        fixed lg:sticky
        top-0 lg:top-0
        left-0
        z-50
        bg-white
        w-64
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-200
        shadow-xl lg:shadow-sm
        transition-transform duration-300
        flex flex-col
        overflow-hidden
        h-screen lg:h-screen
        mt-0
      `}>
        
        {/* Close Button (Mobile Only) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-600 hover:text-gray-900 p-2 bg-white rounded-full shadow-sm z-10"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo Section */}
        <div className="px-5 py-5 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-white">DD</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">DailyDo</h1>
              <p className="text-xs text-gray-500">Task Management</p>
            </div>
          </div>
        </div>

        {/* Main Navigation Area - Flexible middle section */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            {/* Dashboard */}
            <NavLink 
              to="/user/dashboard" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive 
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaHome className="mr-3 text-lg" />
              <span className="font-medium">Dashboard</span>
            </NavLink>

            {/* Tasks Main Menu */}
            <div className="mb-2">
              <button
                onClick={() => setTaskOpen(!taskOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <div className="flex items-center">
                  <FaTasks className="mr-3 text-lg" />
                  <span className="font-medium">Tasks</span>
                </div>
                <FaChevronDown className={`transition-transform duration-200 ${taskOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Task Submenu */}
              {taskOpen && (
                <div className="ml-4 mt-1 pl-4 border-l-2 border-gray-100">
                  <NavLink 
                    to="/user/tasks/new" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2.5 mb-1 rounded-lg transition-colors ${
                        isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaPlus className="mr-3 text-sm" />
                    <span>New Task</span>
                  </NavLink>

                  <NavLink 
                    to="/user/tasks" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                        isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaEye className="mr-3 text-sm" />
                    <span>View Tasks</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Dynamic Quick Stats Section */}
            <div className="mt-8 px-2">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
                Quick Stats
              </div>
              
              {loadingStats ? (
                <div className="space-y-2 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      <div className="h-3 w-8 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Today's Tasks */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClipboardList className="text-blue-500 text-xs" />
                      <span>Today's Tasks</span>
                    </div>
                    <span className={`font-medium ${
                      taskStats.todayTasks > 0 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                    }`}>
                      {taskStats.todayTasks}
                    </span>
                  </div>
                  
                  {/* Completed Tasks */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      <span>Completed</span>
                    </div>
                    <span className={`font-medium ${
                      taskStats.completedTasks > 0 
                        ? 'text-green-600' 
                        : 'text-gray-400'
                    }`}>
                      {taskStats.completedTasks}
                    </span>
                  </div>
                  
                  {/* Pending Tasks */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-orange-500 text-xs" />
                      <span>Pending</span>
                    </div>
                    <span className={`font-medium ${
                      taskStats.pendingTasks > 0 
                        ? 'text-orange-600' 
                        : 'text-gray-400'
                    }`}>
                      {taskStats.pendingTasks}
                    </span>
                  </div>
                  
                  {/* Completion Progress Bar */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-700">
                        {taskStats.completionPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${taskStats.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* User Info & Logout Section - Fixed at bottom */}
        <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
          {loading ? (
            <div className="animate-pulse">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="ml-3 space-y-2">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-2 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
          ) : (
            <>
              {/* User Info */}
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {getUserInitials()}
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.name || "User Account"}
                  </p>
                  <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                    <FaEnvelope className="text-xs" />
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>

              {/* Logout Button with Toast */}
              <button 
                onClick={handleLogoutSimple} // Using the confirmation version
                disabled={isLoggingOut}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors font-medium border ${
                  isLoggingOut 
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100'
                }`}
              >
                <FaSignOutAlt />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;