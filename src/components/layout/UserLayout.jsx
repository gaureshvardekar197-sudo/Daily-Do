// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import UserSidebar from "../sidebar/UserSidebar";
// import UserHeader from "../header/UserHeader";

// const UserLayout = () => {
//   const [activePage, setActivePage] = useState("Dashboard");

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">
//       <UserSidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//       />

//       <div className="flex-1 flex flex-col">
//         <UserHeader title={activePage} />

//         <main className="p-6 flex-1 overflow-y-auto">
//           <Outlet context={{ activePage }} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserLayout;


// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import UserSidebar from "../sidebar/UserSidebar";
// import UserHeader from "../header/UserHeader";

// const UserLayout = () => {
//   const [activePage, setActivePage] = useState("Dashboard");

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">
      
//       {/* SIDEBAR */}
//       <UserSidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//       />

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex flex-col">

//         {/* HEADER */}
//         <div className="sticky top-0 z-40">
//           <UserHeader title={activePage} />
//         </div>

//         {/* MAIN CONTENT */}
//         <main className="pt-4 px-4 lg:px-6 flex-1 overflow-y-auto">
//           <Outlet context={{ activePage }} />
//         </main>

//       </div>
//     </div>
//   );
// };

// export default UserLayout;



import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../sidebar/UserSidebar";
import UserHeader from "../header/UserHeader";

const UserLayout = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">
      
      {/* SIDEBAR */}
      <UserSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="sticky top-0 z-40">
          <UserHeader 
            title={activePage} 
            onMenuClick={() => setIsSidebarOpen(true)}
          />
        </div>

        {/* MAIN CONTENT */}
        <main className="pt-4 px-4 lg:px-6 flex-1 overflow-y-auto">
          <Outlet context={{ activePage }} />
        </main>

      </div>
    </div>
  );
};

export default UserLayout;