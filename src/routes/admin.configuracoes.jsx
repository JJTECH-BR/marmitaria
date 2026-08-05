import { createFileRoute } from "@tanstack/react-router";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";

export const Route = createFileRoute("/admin/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Painel da Marmitaria" },
      {
        name: "description",
        content: "Edite nome, logo, banner, WhatsApp, endereço e horários da marmitaria.",
      },
      { property: "og:title", content: "Configurações — Painel da Marmitaria" },
      { property: "og:description", content: "Personalize os dados da sua marmitaria." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminSettingsPage,
});
