import { createFileRoute, Navigate } from "@tanstack/react-router";
import AdminLoginPage from "../pages/AdminLogin/AdminLoginPage";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/ui/Loading";

function AdminRouteComponent() {
  const { authenticated, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading label="Verificando acesso..." />
      </div>
    );
  }

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
