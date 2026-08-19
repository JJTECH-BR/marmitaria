import { FiMapPin, FiClock, FiPhone } from "react-icons/fi";
import { useApp } from "../contexts/AppContext";

export default function Footer() {
  const { company } = useApp();

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container-app grid gap-4 py-10 text-sm text-muted-foreground sm:grid-cols-3">
        <p className="flex items-center gap-2">
          <FiMapPin className="text-primary" /> {company?.address}
        </p>
        <p className="flex items-center gap-2">
          <FiClock className="text-primary" /> {company?.schedule}
        </p>
        <p className="flex items-center gap-2">
          <FiPhone className="text-primary" /> {company?.whatsapp}
        </p>
      </div>
      <div className="container-app pb-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {company?.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
