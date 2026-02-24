// components/admin/UsersTable.js
import {
    UserCheck,
    Shield,
    Eye,
    Ban,
    CheckCircle,
    UserPlus,
    UserMinus,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useState } from "react";

const UsersTable = ({
    users,
    loading,
    onToggleStatus,
    onChangeRole,
    onViewTasks,
    getRoleIcon
}) => {
    const [expandedUser, setExpandedUser] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return "Invalid date";
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg animate-pulse">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Desktop/Tablet View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Joined
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                {/* User Info Cell */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-9 w-9">
                                            {user.profile_picture ? (
                                                <img
                                                    className="h-9 w-9 rounded-full object-cover"
                                                    src={user.profile_picture}
                                                    alt={user.name}
                                                />
                                            ) : (
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <span className="font-medium text-indigo-600 text-sm">
                                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                                                {user.name || "Unknown User"}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate max-w-[180px]">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Role Cell */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {getRoleIcon(user.role)}
                                        <span className="text-sm text-gray-900">
                                            {user.role === 1 ? "Admin" : "User"}
                                        </span>
                                    </div>
                                </td>

                                {/* Status Cell */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${user.status === "active"
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-rose-100 text-rose-800"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === "active" ? "bg-emerald-500" : "bg-rose-500"
                                                }`}></span>
                                            {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "Unknown"}
                                        </span>
                                    </div>
                                </td>

                                {/* Date Cell */}
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(user.created_at)}
                                </td>

                                {/* Actions Cell - Desktop/Tablet Layout */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex flex-col gap-1.5 min-w-[140px]">
                                        {/* First Row */}
                                        <div className="flex gap-1.5">
                                            <button
                                                onClick={() => onToggleStatus(user.id)}
                                                className={`flex-1 flex items-center justify-center px-2 py-1.5 border text-xs font-medium rounded transition-colors whitespace-nowrap ${user.status === "active"
                                                    ? "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200"
                                                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200"
                                                    }`}
                                            >
                                                {user.status === "active" ? "Block" : "Unblock"}
                                            </button>

                                            <button
                                                onClick={() => onChangeRole(user.id, user.role === 1 ? 0 : 1)}
                                                className={`flex-1 flex items-center justify-center px-2 py-1.5 border text-xs font-medium rounded transition-colors whitespace-nowrap ${user.role === 1
                                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                                                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200"
                                                    }`}
                                            >
                                                {user.role === 1 ? "Make User" : "Make Admin"}
                                            </button>
                                        </div>

                                        {/* Second Row */}
                                        <button
                                            onClick={() => onViewTasks(user.id, user.name)}
                                            className="w-full flex items-center justify-center px-2 py-1.5 border text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                                        >
                                            <Eye className="w-3 h-3 mr-1.5" />
                                            View Tasks
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-3 p-3">
                {users.map((user) => (
                    <div key={user.id} className="bg-white border rounded-lg p-3 shadow-sm">
                        {/* User Header */}
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="flex-shrink-0 h-10 w-10">
                                    {user.profile_picture ? (
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={user.profile_picture}
                                            alt={user.name}
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="font-medium text-indigo-600">
                                                {user.name?.charAt(0).toUpperCase() || "U"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 truncate">
                                        {user.name || "Unknown User"}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleExpand(user.id)}
                                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 ml-1"
                            >
                                {expandedUser === user.id ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Basic Info - Always visible */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {getRoleIcon(user.role)}
                                    <span className="text-xs font-medium">
                                        {user.role === 1 ? "Admin" : "User"}
                                    </span>
                                </div>
                                <div className="h-3 w-px bg-gray-300"></div>
                                <div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${user.status === "active"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-rose-100 text-rose-800"
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${user.status === "active" ? "bg-emerald-500" : "bg-rose-500"
                                            }`}></span>
                                        {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedUser === user.id && (
                            <div className="mt-2 pt-2 border-t">
                                <div className="mb-2">
                                    <div className="text-xs text-gray-500">Joined</div>
                                    <div className="text-sm font-medium">
                                        {formatDate(user.created_at)}
                                    </div>
                                </div>

                                {/* Action Buttons - Expanded */}
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onToggleStatus(user.id)}
                                            className={`flex-1 flex items-center justify-center px-3 py-2 rounded text-sm font-medium transition-colors ${user.status === "active"
                                                    ? "bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200"
                                                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
                                                }`}
                                        >
                                            {user.status === "active" ? "Block" : "Unblock"}
                                        </button>
                                        <button
                                            onClick={() => onChangeRole(user.id, user.role === 1 ? 0 : 1)}
                                            className={`flex-1 flex items-center justify-center px-3 py-2 rounded text-sm font-medium transition-colors ${user.role === 1
                                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
                                                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200"
                                                }`}
                                        >
                                            {user.role === 1 ? "Make User" : "Make Admin"}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onViewTasks(user.id, user.name)}
                                        className="w-full flex items-center justify-center px-3 py-2 rounded text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Tasks
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Collapsed Action Buttons - Always visible */}
                        {expandedUser !== user.id && (
                            <div className="mt-2 space-y-1.5">
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => onToggleStatus(user.id)}
                                        className={`flex-1 flex items-center justify-center px-2 py-1.5 rounded text-xs font-medium transition-colors ${user.status === "active"
                                                ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                            }`}
                                    >
                                        {user.status === "active" ? "Block" : "Unblock"}
                                    </button>
                                    <button
                                        onClick={() => onChangeRole(user.id, user.role === 1 ? 0 : 1)}
                                        className={`flex-1 flex items-center justify-center px-2 py-1.5 rounded text-xs font-medium transition-colors ${user.role === 1
                                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                            }`}
                                    >
                                        {user.role === 1 ? "Make User" : "Make Admin"}
                                    </button>
                                </div>
                                <button
                                    onClick={() => onViewTasks(user.id, user.name)}
                                    className="w-full flex items-center justify-center px-2 py-1.5 rounded text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                                    View Tasks
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersTable;