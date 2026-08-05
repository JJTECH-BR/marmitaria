import { createFileRoute } from "@tanstack/react-router";
import CardapioPage from "../pages/CardapioPage";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio Completo — Tempero Marmitaria" },
      {
        name: "description",
        content:
          "Pratos do dia, pratos fixos, acompanhamentos, bebidas e sobremesas da Tempero Marmitaria.",
      },
      { property: "og:title", content: "Cardápio Completo — Tempero Marmitaria" },
      {
        property: "og:description",
        content: "Navegue por categoria e escolha sua marmita favorita.",
      },
    ],
  }),
  component: CardapioPage,
});
