// import { useState, useEffect } from 'react';
// import UserTaskModal from './UserTaskModal';
// import { getAllUsers, toggleUserStatus, updateUserRole } from '../../api/adminApi';

// const AdminUsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [error, setError] = useState('');
  
//   // Fetch all users
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllUsers();
//       setUsers(response.data);
//       setError('');
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//       setError('Failed to load users. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Handle block/unblock user
//   const handleToggleStatus = async (userId, currentStatus) => {
//     if (!window.confirm(`Are you sure you want to ${currentStatus === 'active' ? 'block' : 'unblock'} this user?`)) {
//       return;
//     }
    
//     try {
//       await toggleUserStatus(userId);
//       fetchUsers(); // Refresh the users list
//     } catch (err) {
//       console.error('Failed to update user status:', err);
//       alert('Failed to update user status.');
//     }
//   };
  
//   // Handle role change
//   const handleRoleChange = async (userId, currentRole) => {
//     const newRole = currentRole === 1 ? 0 : 1; // Toggle between 0 (user) and 1 (admin)
//     const roleName = newRole === 1 ? 'Admin' : 'User';
    
//     if (!window.confirm(`Are you sure you want to change this user's role to ${roleName}?`)) {
//       return;
//     }
    
//     try {
//       await updateUserRole(userId, newRole);
//       fetchUsers(); // Refresh the users list
//     } catch (err) {
//       console.error('Failed to update user role:', err);
//       alert('Failed to update user role.');
//     }
//   };
  
//   // When admin clicks "View Tasks" on a user
//   const handleViewTasks = (user) => {
//     setSelectedUser({
//       id: user.id,
//       name: user.name
//     });
//   };
  
//   useEffect(() => {
//     fetchUsers();
//   }, []);
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg text-gray-600">Loading users...</div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//         <p className="text-red-700">{error}</p>
//         <button 
//           onClick={fetchUsers}
//           className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }
  
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
//         <div className="text-sm text-gray-500">
//           Total Users: <span className="font-semibold">{users.length}</span>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   User
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Joined
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
//                         <span className="font-bold text-indigo-600 text-sm">
//                           {user.name.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900">{user.name}</div>
//                         <div className="text-xs text-gray-500">ID: {user.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-900">
//                     {user.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.role === 1 
//                         ? 'bg-purple-100 text-purple-800' 
//                         : 'bg-blue-100 text-blue-800'
//                     }`}>
//                       {user.role === 1 ? 'Admin' : 'User'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.status === 'active' 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {user.status === 'active' ? 'Active' : 'Blocked'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(user.created_at).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                     <button 
//                       onClick={() => handleViewTasks(user)}
//                       className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
//                       title="View user's tasks"
//                     >
//                       View Tasks
//                     </button>
//                     <button 
//                       onClick={() => handleToggleStatus(user.id, user.status)}
//                       className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
//                         user.status === 'active'
//                           ? 'bg-red-500 text-white hover:bg-red-600'
//                           : 'bg-green-500 text-white hover:bg-green-600'
//                       }`}
//                       title={user.status === 'active' ? 'Block user' : 'Unblock user'}
//                     >
//                       {user.status === 'active' ? 'Block' : 'Unblock'}
//                     </button>
//                     <button 
//                       onClick={() => handleRoleChange(user.id, user.role)}
//                       className="px-3 py-1.5 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors"
//                       title={user.role === 1 ? 'Make User' : 'Make Admin'}
//                     >
//                       {user.role === 1 ? 'Make User' : 'Make Admin'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {users.length === 0 && !loading && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
//               <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 3.75l-.75.75" />
//               </svg>
//             </div>
//             <h4 className="text-lg font-medium text-gray-900 mb-2">No users found</h4>
//             <p className="text-gray-500 text-sm">No users have registered yet.</p>
//           </div>
//         )}
//       </div>
      
//       {/* Task Modal */}
//       {selectedUser && (
//         <UserTaskModal
//           userId={selectedUser.id}
//           userName={selectedUser.name}
//           isAdmin={true}
//           onClose={() => setSelectedUser(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminUsersPage;