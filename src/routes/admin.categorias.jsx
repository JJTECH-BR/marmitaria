import { createFileRoute } from "@tanstack/react-router";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";

export const Route = createFileRoute("/admin/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias — Painel da Marmitaria" },
      { name: "description", content: "Organize as categorias do cardápio da marmitaria." },
      { property: "og:title", content: "Categorias — Painel da Marmitaria" },
      { property: "og:description", content: "Adicione, edite ou remova categorias." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCategoriesPage,
});
