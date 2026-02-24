import { useEffect, useState, useCallback, useMemo } from "react";
import api from "../../api/axios";
import {
  Users as UsersIcon,
  Search,
  Filter,
  RefreshCw,
  UserCheck,
  UserX,
  Shield,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";

import UserTaskModal from "../../components/admin/UserTaskModal";
import Pagination from "../../components/common/Pagination";
import UsersTable from "../../components/admin/UsersTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial load
  const [refreshing, setRefreshing] = useState(false); // New state for refresh
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedUserForTasks, setSelectedUserForTasks] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchUsers = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchUsers(false);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole, filterStatus, sortBy, sortOrder]);

  const toggleStatus = async (id) => {
    try {
      await api.post(`/admin/user/status/${id}`);
      fetchUsers(true); // Pass true to indicate refresh
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await api.post(`/admin/user/role/${id}`, { role });
      fetchUsers(true); // Pass true to indicate refresh
    } catch (error) {
      console.error("Failed to change role:", error);
    }
  };

  const handleViewTasksClick = useCallback((userId, userName) => {
    setSelectedUserForTasks({ id: userId, name: userName });
  }, []);

  const handleCloseTaskModal = useCallback(() => {
    setSelectedUserForTasks(null);
  }, []);

  const handleSort = useCallback((field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  }, [sortBy, sortOrder]);

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const matchesSearch = searchTerm === "" || 
          u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = filterRole === "all" ||
          (filterRole === "admin" ? u.role === 1 : u.role === 0);
        
        const matchesStatus = filterStatus === "all" || u.status === filterStatus;
        
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        let aVal, bVal;
        if (sortBy === "name") {
          aVal = a.name?.toLowerCase() || "";
          bVal = b.name?.toLowerCase() || "";
        } else {
          aVal = a[sortBy] || "";
          bVal = b[sortBy] || "";
        }
        return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
      });
  }, [users, searchTerm, filterRole, filterStatus, sortBy, sortOrder]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleItemsPerPageChange = useCallback((value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, []);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
    admins: users.filter((u) => u.role === 1).length,
  }), [users]);

  const getRoleIcon = useCallback((role) => {
    return role === 1 ? (
      <Shield className="w-4 h-4 text-indigo-600" />
    ) : (
      <UserCheck className="w-4 h-4 text-gray-600" />
    );
  }, []);

  const statsCards = [
    {
      label: "Total Users",
      value: initialLoading ? "--" : stats.total,
      icon: UsersIcon,
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-100",
      loading: initialLoading
    },
    {
      label: "Active Users",
      value: initialLoading ? "--" : stats.active,
      icon: UserCheck,
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      borderColor: "border-emerald-100",
      loading: initialLoading
    },
    {
      label: "Administrators",
      value: initialLoading ? "--" : stats.admins,
      icon: Shield,
      gradient: "from-violet-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
      borderColor: "border-violet-100",
      loading: initialLoading
    },
    {
      label: "Blocked Users",
      value: initialLoading ? "--" : stats.blocked,
      icon: UserX,
      gradient: "from-rose-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
      borderColor: "border-rose-100",
      loading: initialLoading
    }
  ];

  const hasUsersToDisplay = paginatedUsers.length > 0;

  // Full page loader for initial loading
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg">
                <UsersIcon className="text-white w-8 h-8" />
              </div>
              <div className="absolute -top-2 -right-2 bg-white border-2 border-indigo-600 text-indigo-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
                ?
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Users
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch user data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* User Task Modal */}
        {selectedUserForTasks && (
          <UserTaskModal
            userId={selectedUserForTasks.id}
            userName={selectedUserForTasks.name}
            onClose={handleCloseTaskModal}
            isAdmin={true}
          />
        )}

        {/* Mobile Filters Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Role</h3>
                  <div className="space-y-2">
                    {["all", "admin", "user"].map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setFilterRole(role);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          filterRole === role
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {role === "all" ? "All Roles" : role === "admin" ? "Admins" : "Users"}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Status</h3>
                  <div className="space-y-2">
                    {["all", "active", "blocked"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilterStatus(status);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          filterStatus === status
                            ? status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-3 bg-indigo-600 rounded-xl sm:rounded-2xl shadow">
                  <UsersIcon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
                  {stats.total}
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  User Management
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Total: {stats.total} users | Active: {stats.active} | Admins: {stats.admins}
                </p>
              </div>
            </div>
            
            <div className="flex sm:hidden items-center justify-between gap-2">
              <button
                onClick={() => setShowMobileMenu(true)}
                className="p-2.5 bg-white border rounded-lg hover:bg-gray-50"
                disabled={refreshing}
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => fetchUsers(true)}
                disabled={refreshing}
                className={`p-2.5 bg-white border rounded-lg hover:bg-gray-50 flex items-center justify-center min-w-[2.5rem] ${
                  refreshing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {refreshing ? (
                  <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 flex items-center gap-2"
                disabled={refreshing}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {showFilters ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => fetchUsers(true)}
                disabled={refreshing}
                className={`px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 flex items-center gap-2 ${
                  refreshing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {refreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statsCards.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bgColor} rounded-2xl border ${stat.borderColor} p-5 md:p-6 shadow-sm hover:shadow transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              
              <div>
                {stat.loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-12 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                )}
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border p-5 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-sm md:text-base"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
                onDoubleClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                disabled={refreshing}
              />
            </div>
          </div>

          {showFilters && (
            <div className="hidden sm:block mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    User Role
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "admin", "user"].map((role) => (
                      <button
                        key={role}
                        onClick={() => setFilterRole(role)}
                        disabled={refreshing}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          filterRole === role
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } ${refreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {role === "all" ? "All Roles" : role === "admin" ? "Admins" : "Users"}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "active", "blocked"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        disabled={refreshing}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          filterStatus === status
                            ? status === "active"
                              ? "bg-emerald-600 text-white shadow"
                              : "bg-rose-600 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } ${refreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sort By
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["name", "email", "created_at"].map((field) => (
                      <button
                        key={field}
                        onClick={() => handleSort(field)}
                        disabled={refreshing}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                          sortBy === field
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } ${refreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {field === "name" ? "Name" : field === "email" ? "Email" : "Date"}
                        {sortBy === field && (
                          sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
          {refreshing ? (
            // Refresh loader (lighter than initial load)
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Refreshing Users
              </h3>
              <p className="text-gray-500">
                Updating user data...
              </p>
            </div>
          ) : hasUsersToDisplay ? (
            <>
              <UsersTable
                users={paginatedUsers}
                loading={loading}
                onToggleStatus={toggleStatus}
                onChangeRole={changeRole}
                onViewTasks={handleViewTasksClick}
                getRoleIcon={getRoleIcon}
              />
              
              {filteredUsers.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredUsers.length}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 mb-4">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                {users.length === 0 ? "No users found" : "No users match your search"}
              </h3>
              <p className="text-gray-500 text-sm md:text-base max-w-sm mx-auto px-4 mb-4">
                {users.length === 0 
                  ? "Try adding users to the system"
                  : searchTerm 
                    ? `No users found matching "${searchTerm}"`
                    : `No users found with current filters`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => fetchUsers(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" />
                  Refresh
                </button>
                {(searchTerm || filterRole !== "all" || filterStatus !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterRole("all");
                      setFilterStatus("all");
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;