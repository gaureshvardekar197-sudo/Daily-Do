import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../sidebar/AdminSidebar";
import AdminHeader from "../header/AdminHeader";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area with Sidebar Offset */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Sticky Header */}
        <AdminHeader
          title={activePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet context={{ setActivePage }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;