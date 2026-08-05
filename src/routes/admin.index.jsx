import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "../pages/admin/DashboardPage";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Painel da Marmitaria" },
      {
        name: "description",
        content: "Resumo de produtos, categorias e pedidos da marmitaria.",
      },
      { property: "og:title", content: "Dashboard — Painel da Marmitaria" },
      { property: "og:description", content: "Acompanhe a operação do seu cardápio digital." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});
