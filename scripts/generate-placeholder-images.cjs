const fs = require("fs");
const path = require("path");

const dir = path.join("public", "images");
const items = [
  { file: "batatinha-frita.svg", emoji: "\u{1F35F}", name: "Batatinha Frita" },
  { file: "batata-palha.svg", emoji: "\u{1F954}", name: "Batata Palha" },
  { file: "arroz.svg", emoji: "\u{1F35A}", name: "Arroz Branco" },
  { file: "feijao.svg", emoji: "\u{1F372}", name: "Feijão Carioca" },
  { file: "farofa.svg", emoji: "\u{1F33E}", name: "Farofa da Casa" },
  { file: "salada.svg", emoji: "\u{1F957}", name: "Salada Mista" },
  { file: "refrigerante.svg", emoji: "\u{1F964}", name: "Refrigerante Lata" },
  { file: "suco.svg", emoji: "\u{1F379}", name: "Suco Natural" },
  { file: "pudim.svg", emoji: "\u{1F36E}", name: "Pudim de Leite" },
];

function svg(emoji, name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f6b45"/>
      <stop offset="100%" stop-color="#123420"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#bg)"/>
  <circle cx="520" cy="70" r="150" fill="#ffffff10"/>
  <circle cx="40" cy="410" r="110" fill="#ffffff0d"/>
  <circle cx="300" cy="205" r="130" fill="#ffffff14"/>
  <text x="300" y="245" font-size="130" text-anchor="middle">${emoji}</text>
  <text x="300" y="345" font-size="34" font-family="Segoe UI, Arial, sans-serif" font-weight="700" fill="#f7e7bb" text-anchor="middle">${name}</text>
</svg>
`;
}

items.forEach((item) => {
  fs.writeFileSync(path.join(dir, item.file), svg(item.emoji, item.name), "utf8");
  console.log("created", item.file);
});
