import { Navigate, Outlet } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedAdminPage() {
    const { authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}
