import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
} from "react-icons/md";
import {
  FaUsers,
  FaTasks,
  FaChartBar,
  FaSignOutAlt,
  FaTimes,
  FaEnvelope,
  FaUserShield
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import from react-hot-toast
import api from "../../api/axios";

const AdminSidebar = ({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch admin profile data
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setAdmin(res.data);
      } catch (error) {
        console.error("Failed to fetch admin profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const menu = [
    { title: "Dashboard", icon: <MdDashboard />, page: "dashboard", path: "/admin/dashboard" },
    { title: "Users", icon: <FaUsers />, page: "users", path: "/admin/users" },
    { title: "Tasks", icon: <FaTasks />, page: "tasks", path: "/admin/tasks" },
    { title: "Stats", icon: <FaChartBar />, page: "stats", path: "/admin/stats" },
  ];

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors duration-200";

  // Get admin initials
  const getAdminInitials = () => {
    if (!admin?.name) return "A";
    return admin.name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle logout with react-hot-toast
  const handleLogout = () => {
    // Show loading toast
    const toastId = toast.loading('Logging out...');
    setIsLoggingOut(true);
    
    setTimeout(() => {
      localStorage.clear();
      setSidebarOpen(false);
      
      // Update toast to success
      toast.success('Logged out successfully!', {
        id: toastId,
        duration: 2000,
      });
      
      // Navigate after delay
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
      
    }, 1000);
  };

  // Handle logout with confirmation (optional)
  const handleLogoutWithConfirm = () => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-800 mb-3">Are you sure you want to logout?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleLogout();
            }}
            className="flex-1 bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
    });
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* White Sidebar */}
      <aside
        className={`
          fixed lg:fixed top-0 left-0
          h-screen w-64 bg-white text-gray-800
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 shadow-lg z-50 border-r border-gray-200
        `}
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {/* Logo/Icon */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-white">DD</span>
            </div>
            
            {/* Brand Name & Description */}
            <div>
              <h1 className="text-lg font-bold text-gray-900">DailyDo</h1>
              <p className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">Admin </p>
            </div>
          </div>

          {/* Close (mobile only) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto h-[calc(100vh-15rem)]">
          <nav className="p-4 space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.page}
                to={item.path}
                className={({ isActive }) =>
                  `${linkClass} ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
                onClick={() => {
                  setActivePage(item.title);
                  setSidebarOpen(false);
                }}
                end={item.page === "dashboard"}
              >
                <span className={`text-lg ${activePage === item.title ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Admin Profile Section - Fixed at bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          {loading ? (
            // Loading skeleton
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
              {/* Admin Info */}
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {getAdminInitials()}
                </div>
                <div className="ml-3 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {admin?.name || "Admin Account"}
                    </p>
                    <FaUserShield className="text-xs text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                    <FaEnvelope className="text-xs" />
                    {admin?.email || "admin@example.com"}
                  </p>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      Admin
                    </span>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogoutWithConfirm} // or handleLogout for direct logout
                disabled={isLoggingOut}
                className={`flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg transition-colors font-medium ${
                  isLoggingOut 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-100"
                }`}
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;