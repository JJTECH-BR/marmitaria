import { createFileRoute } from "@tanstack/react-router";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";

export const Route = createFileRoute("/dashboard/pedidos")({
  component: AdminOrdersPage,
});
