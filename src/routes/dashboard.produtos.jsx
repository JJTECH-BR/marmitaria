import { createFileRoute } from "@tanstack/react-router";
import AdminMenuPage from "../pages/admin/AdminMenuPage";

export const Route = createFileRoute("/dashboard/produtos")({
  component: AdminMenuPage,
});
