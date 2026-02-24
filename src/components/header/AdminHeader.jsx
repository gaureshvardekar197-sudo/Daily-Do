// AdminHeader.jsx - Separate file
import { FaBars, FaSignOutAlt, FaUserShield, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import Logo from "../../assets/logo.png";

const AdminHeader = ({ title, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch admin data
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/user/profile");
        setAdmin(res.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        setAdmin({
          name: "Admin User",
          email: "admin@example.com",
          role: "admin"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  // Handle logout with confirmation alert
  const handleLogout = () => {
    // Show confirmation alert dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (!confirmLogout) {
      return; // User cancelled
    }
    
    // Show loading toast
    const toastId = toast.loading('Logging out...');
    setIsLoggingOut(true);
    
    setTimeout(() => {
      localStorage.clear();
      
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

  // Get admin initials for avatar
  const getAdminInitials = () => {
    if (!admin?.name) return "A";
    return admin.name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left - Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaBars size={20} className="text-gray-700" />
          </button>

          {/* Desktop Title */}
          <h1 className="hidden lg:block text-xl font-bold text-gray-800">
            {title}
          </h1>
        </div>

        {/* Center Logo (mobile) */}
        <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
          <img 
            src={Logo} 
            alt="Logo" 
            className="w-auto h-[100px] object-contain" 
          />
        </div>

        {/* Right - Admin Info & Logout */}
        <div className="flex items-center gap-4">
          {/* Admin Info - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Admin Details */}
            <div className="text-right">
              {loading ? (
                <div className="animate-pulse space-y-1">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1 justify-end">
                    <p className="text-sm font-medium text-gray-800">
                      {admin?.name || "Admin User"}
                    </p>
                    <FaUserShield className="text-xs text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                    <FaEnvelope className="text-xs" />
                    {admin?.email || "admin@example.com"}
                  </p>
                  <div className="mt-1 flex justify-end">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      Admin
                    </span>
                  </div>
                </>
              )}
            </div>
            
            {/* Admin Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {getAdminInitials()}
            </div>
          </div>

          {/* Admin Avatar - Mobile */}
          <div className="lg:hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {getAdminInitials()}
            </div>
          </div>

          {/* Logout Button with Alert Confirmation */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium ${
              isLoggingOut 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Logging out...</span>
              </>
            ) : (
              <>
                <FaSignOutAlt className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;