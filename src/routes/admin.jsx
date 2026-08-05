import { createFileRoute, Outlet } from "@tanstack/react-router";

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
  component: () => <Outlet />,
});
