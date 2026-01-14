import { useState, useEffect } from "react";
import api from "../utils/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";
import { Plus, Search, Filter } from "lucide-react";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    // Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get("/tasks");
            setTasks(data);
            setError("");
        } catch (error) {
            console.error("Error fetching tasks", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const { data } = await api.post("/tasks", taskData);
            setTasks([...tasks, data]);
            setIsModalOpen(false);
            setError("");
        } catch (error) {
            console.error("Error creating task", error);
            alert("Failed to create task: " + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const { data } = await api.put(`/tasks/${currentTask._id}`, taskData);
            setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
            setIsModalOpen(false);
            setCurrentTask(null);
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter((task) => task._id !== id));
            } catch (error) {
                console.error("Error deleting task", error);
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const { data } = await api.put(`/tasks/${id}`, { status: newStatus });
            setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
        } catch (error) {
            console.error("Error updating status", error);
        }
    }

    const openCreateModal = () => {
        setCurrentTask(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || task.status === statusFilter;
        const matchesPriority =
            priorityFilter === "All" || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    if (loading) return <div className="flex justify-center p-8 text-gray-500">Loading tasks...</div>;

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
                <button
                    onClick={openCreateModal}
                    className="mt-3 w-full sm:mt-0 sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Task
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="All">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>

            {/* Task Grid */}
            {filteredTasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                    <p className="text-gray-500">No tasks found. Create one to get started!</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={openEditModal}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentTask ? "Edit Task" : "Create New Task"}
            >
                <TaskForm
                    task={currentTask}
                    onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default TasksPage;
