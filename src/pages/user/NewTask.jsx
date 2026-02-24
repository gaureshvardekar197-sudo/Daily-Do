import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewTask = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    day: "today",
    priority: "medium",
    completed: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/tasks",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      setMessage("✅ Task created successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        day: "today",
        priority: "medium",
        completed: false,
      });
       // Redirect to ViewTask page
      setTimeout(() => {
        navigate("/user/tasks");
      }, 1000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        ➕ Create New Task
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-900">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Optional description"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Day */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Task Day
          </label>
          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="later">Later</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Completed */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label className="text-sm font-semibold">
            Mark as completed
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
