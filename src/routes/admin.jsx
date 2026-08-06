import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import AdminLoginPage from "../pages/AdminLogin/AdminLoginPage";
import { useAuth } from "../contexts/AuthContext";

function AdminRouteComponent() {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AdminLoginPage />;
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel da Marmitaria" },
      { name: "description", content: "Painel administrativo do cardápio digital." },
      { property: "og:title", content: "Painel da Marmitaria" },
      { property: "og:description", content: "Gerencie produtos, categorias e configurações." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminRouteComponent,
});
