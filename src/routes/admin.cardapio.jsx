import { createFileRoute } from "@tanstack/react-router";
import AdminMenuPage from "../pages/admin/AdminMenuPage";

export const Route = createFileRoute("/admin/cardapio")({
  head: () => ({
    meta: [
      { title: "Gerenciar Cardápio — Painel da Marmitaria" },
      { name: "description", content: "Cadastre, edite e remova produtos do cardápio." },
      { property: "og:title", content: "Gerenciar Cardápio — Painel da Marmitaria" },
      { property: "og:description", content: "Controle total dos itens do seu cardápio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminMenuPage,
});
