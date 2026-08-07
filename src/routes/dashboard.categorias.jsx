import { createFileRoute } from "@tanstack/react-router";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";

export const Route = createFileRoute("/dashboard/categorias")({
  component: AdminCategoriesPage,
});
