import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { LogOut, CheckSquare } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm fixed w-full z-10 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <CheckSquare className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900">
                                TaskMaster
                            </span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/tasks"
                                className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                            >
                                My Tasks
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="mr-4 text-sm text-gray-600 font-medium">
                                Hello, {user.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="relative inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:scale-105"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
