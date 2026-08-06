import { Outlet, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminPage() {
    const { authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}
