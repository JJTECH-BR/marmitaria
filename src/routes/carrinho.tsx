import { createFileRoute } from "@tanstack/react-router";
import CarrinhoPage from "../pages/CarrinhoPage";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Seu Pedido — Tempero Marmitaria" },
      {
        name: "description",
        content:
          "Revise os itens da sua marmita, adicione observações e envie o pedido pelo WhatsApp.",
      },
      { property: "og:title", content: "Seu Pedido — Tempero Marmitaria" },
      {
        property: "og:description",
        content: "Confira o resumo do pedido e finalize em segundos.",
      },
    ],
  }),
  component: CarrinhoPage,
});
