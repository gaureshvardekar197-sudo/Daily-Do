// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
// import ProtectedRoute from "./auth/ProtectedRoute";
// import PublicRoute from "./auth/PublicRoute";

// // Layouts
// import AdminLayout from "./components/layout/AdminLayout";
// import UserLayout from "./components/layout/UserLayout";

// // Pages
// import Dashboard from "./pages/admin/Dashboard";
// import UserDashboard from "./pages/user/UserDashboard";
// import NewTask from "./pages/user/NewTask";
// import ViewTask from "./pages/user/ViewTask";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Public */}
//         <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
//         <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

//         {/* Admin */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role={1}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//         </Route>

//         {/* User */}
//         <Route
//           path="/user"
//           element={
//             <ProtectedRoute role={0}>
//               <UserLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<UserDashboard />} />
//           <Route path="tasks" element={<ViewTask />} />
//           <Route path="tasks/new" element={<NewTask />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

// Layouts
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Tasks from "./pages/admin/Tasks";
import Stats from "./pages/admin/Stats";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import NewTask from "./pages/user/NewTask";
import ViewTask from "./pages/user/ViewTask";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        {/* Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role={1}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="stats" element={<Stats />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role={0}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="tasks" element={<ViewTask />} />
          <Route path="tasks/new" element={<NewTask />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
