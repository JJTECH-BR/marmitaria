import { Link, useNavigate } from "@tanstack/react-router";
import {
  FiGrid,
  FiBookOpen,
  FiTag,
  FiSettings,
  FiArrowLeft,
  FiClipboard,
  FiLogOut,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { useAuth } from "../contexts/AuthContext";
import { useApp } from "../contexts/AppContext";

interface SidebarItem {
  to: string;
  label: string;
  icon: IconType;
  exact?: boolean;
}

const ITEMS: SidebarItem[] = [
  { to: "/dashboard", label: "Visão geral", icon: FiGrid, exact: true },
  { to: "/dashboard/produtos", label: "Produtos", icon: FiBookOpen },
  { to: "/dashboard/categorias", label: "Categorias", icon: FiTag },
  { to: "/dashboard/pedidos", label: "Pedidos", icon: FiClipboard },
  { to: "/dashboard/configuracoes", label: "Configurações", icon: FiSettings },
];

const linkBase =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { company } = useApp();

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin" });
  };

  return (
    <aside className="border-b border-border bg-card lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
      <div className="flex items-center gap-3 px-4 py-5">
        {company?.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="h-10 w-10 rounded-xl bg-surface object-contain p-1"
          />
        ) : null}
        <div className="leading-tight">
          <p className="text-xs font-semibold text-primary">Painel</p>
          <p className="text-sm font-extrabold">{company?.name || "Marmitaria"}</p>
        </div>
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
        <button onClick={handleLogout} className={`${linkBase} w-full justify-start`}>
          <FiLogOut size={17} />
          <span className="whitespace-nowrap">Sair</span>
        </button>
        <Link to="/" className={`${linkBase} lg:mt-6`}>
          <FiArrowLeft size={17} />
          <span className="whitespace-nowrap">Ver cardápio</span>
        </Link>
      </nav>
    </aside>
  );
}
