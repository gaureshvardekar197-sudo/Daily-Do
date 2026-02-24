// import { FaSignOutAlt, FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const UserHeader = ({ title, onMenuClick }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   // 🔹 Fetch logged-in user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/user/profile"); // ✅ FIXED
//         setUser(res.data);
//       } catch (error) {
//         console.error("Failed to fetch user", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <header className="bg-white border-b border-gray-200">
//       <div className="flex items-center justify-between px-4 py-3">

//         {/* Left */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={onMenuClick}
//             className="lg:hidden text-gray-700"
//           >
//             <FaBars size={20} />
//           </button>

//           <h1 className="text-lg font-semibold text-gray-800">
//             {title || "Dashboard"}
//           </h1>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
//               {user?.name?.charAt(0).toUpperCase() || "U"}
//             </div>

//             <div className="hidden sm:block">
//               <p className="text-sm font-medium text-gray-700">
//                 {user?.name || "User"}
//               </p>
//             </div>
//           </div>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
//           >
//             <FaSignOutAlt />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default UserHeader;
// import { FaSignOutAlt, FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import Logo from "../../assets/logo.png";

// const UserHeader = ({ title, onMenuClick }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/user/profile");
//         setUser(res.data);
//       } catch (error) {
//         console.error("Failed to fetch user", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <header className="relative bg-white border-b border-gray-200">
//       <div className="flex items-center justify-between px-4 py-3">

//         {/* LEFT */}
//         <div className="flex items-center gap-3 z-20">
//           <button
//             onClick={onMenuClick}
//             className="lg:hidden text-gray-700"
//           >
//             <FaBars size={20} />
//           </button>

//           {/* Desktop title */}
//           <h1 className="hidden lg:block text-lg font-semibold text-gray-800">
//             {title || "Dashboard"}
//           </h1>
          
//         </div>

//         {/* CENTER LOGO (MOBILE) */}
//         <div className="absolute inset-0 flex justify-center items-center lg:hidden z-10 pointer-events-none">
//           <img
//             src={Logo}
//             alt="Logo"
//             className=" w-auto h-[100px]"
//           />
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-3 z-20">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
//               {user?.name?.charAt(0).toUpperCase() || "U"}
//             </div>

//             <div className="hidden sm:block">
//               <p className="text-sm font-medium text-gray-700">
//                 {user?.name || "User"}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
//           >
//             <FaSignOutAlt />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default UserHeader;
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import Logo from "../../assets/logo.png";
import { toast } from "react-hot-toast";

const UserHeader = ({ title, onMenuClick }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <FaSignOutAlt className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-black-900">Confirm Logout</p>
              <p className="text-sm text-black-600">Are you sure you want to logout?</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performLogout();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Yes, Logout
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  const performLogout = () => {
    setIsLoggingOut(true);
    
    toast.loading("Logging out...", {
      id: "logout",
    });

    setTimeout(() => {
      localStorage.clear();
      
      toast.dismiss("logout");
      toast.success("Logged out successfully!", {
        duration: 2000,
      });
      
      navigate("/login", { replace: true });
    }, 500);
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
    <header className="relative bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">

        {/* LEFT */}
        <div className="flex items-center gap-3 z-20">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-700 hover:text-gray-900 p-1"
            disabled={isLoggingOut}
          >
            <FaBars size={20} />
          </button>

          {/* Desktop title */}
          <h1 className="hidden lg:block text-lg font-semibold text-gray-800">
            {title || "Dashboard"}
          </h1>
        </div>

        {/* CENTER LOGO (MOBILE) */}
        <div className="absolute inset-0 flex justify-center items-center lg:hidden z-10 pointer-events-none">
          <img
            src={Logo}
            alt="Logo"
            className="w-auto h-[100px]"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {getUserInitials()}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                {user?.name || "User"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              isLoggingOut 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-100'
            }`}
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;