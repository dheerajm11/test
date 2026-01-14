import { Calendar, Edit2, Trash2, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    const priorityColors = {
        High: "bg-red-100 text-red-800",
        Medium: "bg-yellow-100 text-yellow-800",
        Low: "bg-green-100 text-green-800",
    };

    const statusColors = {
        Completed: "bg-green-100 text-green-800",
        "In Progress": "bg-blue-100 text-blue-800",
        Pending: "bg-gray-100 text-gray-800",
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                    <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]
                            }`}
                    >
                        {task.priority}
                    </span>
                    <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]
                            }`}
                    >
                        {task.status}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                {task.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">
                {task.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No date"}</span>
                </div>

                {task.status !== 'Completed' ? (
                    <button
                        onClick={() => onStatusChange(task._id, 'Completed')}
                        className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium text-xs uppercase tracking-wide"
                    >
                        <CheckCircle className="h-4 w-4" />
                        Mark Done
                    </button>
                ) : (
                    <span className="flex items-center gap-1.5 text-green-600 font-medium text-xs uppercase tracking-wide">
                        <CheckCircle className="h-4 w-4" />
                        Done
                    </span>
                )}

            </div>
        </div>
    );
};

export default TaskCard;
