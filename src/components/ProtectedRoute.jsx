import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export const StudentProtectedRoute = () => {
    const Auth = useAuth();
    const {user, loading} = Auth;

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-slate-950 text-white text-xl">Loading...</div>;
    }

    if (user && user.role === "student") {
        return <Outlet />;
    }else {
        return <Navigate to="/login" replace />;
    }
};

export const TeacherProtectedRoute = () => {
    const Auth = useAuth();
    const {user, loading} = Auth;

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-slate-950 text-white text-xl">Loading...</div>;
    }

    if (user && user.role === "teacher") {
        return <Outlet />;
    }
    return <Navigate to="/login" replace/>;
};