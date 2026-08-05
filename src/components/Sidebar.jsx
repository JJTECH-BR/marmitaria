import { Link } from "@tanstack/react-router";
import { FiGrid, FiBookOpen, FiTag, FiSettings, FiArrowLeft } from "react-icons/fi";

const ITEMS = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { to: "/admin/cardapio", label: "Cardápio", icon: FiBookOpen },
  { to: "/admin/categorias", label: "Categorias", icon: FiTag },
  { to: "/admin/configuracoes", label: "Configurações", icon: FiSettings },
];

const linkBase =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground";

export default function Sidebar() {
  return (
    <aside className="border-b border-border bg-card lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
      <div className="flex items-center gap-2 px-4 py-5">
        <span className="text-sm font-extrabold">Painel</span>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:overflow-visible">
        {ITEMS.map(({ to, label, icon: Icon, exact }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: !!exact }}
            className={linkBase}
            activeProps={{ className: "bg-primary-soft text-primary" }}
          >
            <Icon size={17} />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        ))}
        <Link to="/" className={`${linkBase} lg:mt-6`}>
          <FiArrowLeft size={17} />
          <span className="whitespace-nowrap">Ver cardápio</span>
        </Link>
      </nav>
    </aside>
  );
}
