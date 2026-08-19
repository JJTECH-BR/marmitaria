import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tempero Marmitaria — Cardápio do Dia e Pedidos no WhatsApp" },
      {
        name: "description",
        content:
          "Veja o cardápio do dia da Tempero Marmitaria, monte sua marmita com acompanhamentos e finalize o pedido pelo WhatsApp.",
      },
      { property: "og:title", content: "Tempero Marmitaria — Cardápio do Dia" },
      {
        property: "og:description",
        content: "Comida caseira feita na hora. Monte sua marmita e peça pelo WhatsApp.",
      },
    ],
  }),
  component: HomePage,
});
