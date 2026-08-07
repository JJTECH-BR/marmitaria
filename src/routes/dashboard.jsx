import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-10">{<Outlet />}</div>
    </div>
  );
}

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Painel — Tempero Marmitaria" }, { name: "robots", content: "noindex" }],
  }),
  component: DashboardLayout,
});
