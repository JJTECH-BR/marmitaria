import { createFileRoute, Navigate, useLocation } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import DashboardPage from '../pages/admin/DashboardPage';
import AdminMenuPage from '../pages/admin/AdminMenuPage';
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';

function DashboardRouteComponent() {
    const { authenticated } = useAuth();
    const location = useLocation();

    if (!authenticated) {
        return <Navigate to="/admin" replace />;
    }

    if (location.pathname === '/dashboard/produtos') {
        return <AdminMenuPage />;
    }

    if (location.pathname === '/dashboard/categorias') {
        return <AdminCategoriesPage />;
    }

    if (location.pathname === '/dashboard/configuracoes') {
        return <AdminSettingsPage />;
    }

    if (location.pathname === '/dashboard/pedidos') {
        return <AdminOrdersPage />;
    }

    return <DashboardPage />;
}

export const Route = createFileRoute('/dashboard')({
    component: DashboardRouteComponent,
});
