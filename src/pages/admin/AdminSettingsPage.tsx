import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../layouts/AdminLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Loading from "../../components/ui/Loading";
import { useApp } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";

interface SettingsForm {
  name: string;
  logo: string;
  banner: string;
  phone: string;
  whatsapp: string;
  address: string;
  schedule: string;
  defaultMessage: string;
  adminPin: string;
  [key: string]: string;
}

export default function AdminSettingsPage() {
  const { company, settings, saveCompany, saveSettings, loading } = useApp();
  const { pin, savePin } = useAuth();
  const [form, setForm] = useState<SettingsForm | null>(null);

  useEffect(() => {
    if (company) {
      setForm({
        ...company,
        phone: company.phone || "",
        defaultMessage: settings?.defaultMessage || "",
        adminPin: pin || "1234",
      });
    }
  }, [company, settings, pin]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form) return;
    const { defaultMessage, adminPin, ...companyData } = form;
    saveCompany(companyData as Parameters<typeof saveCompany>[0]);
    saveSettings({ ...(settings || {}), defaultMessage });
    savePin(adminPin || "1234");
    toast.success("Configurações salvas");
  };

  if (loading || !form) {
    return (
      <AdminLayout title="Configurações">
        <Loading />
      </AdminLayout>
    );
  }

  const field = (key: string) => ({
    value: form[key] || "",
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [key]: event.target.value }),
  });

  return (
    <AdminLayout title="Configurações" subtitle="Dados da marmitaria">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl bg-card p-6 shadow-card"
      >
        <Input id="s-name" label="Nome da empresa" {...field("name")} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="s-logo" label="Logo (URL)" {...field("logo")} />
          <Input id="s-banner" label="Banner (URL)" {...field("banner")} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="s-phone" label="Telefone" placeholder="(84) 99999-9999" {...field("phone")} />
          <Input
            id="s-whats"
            label="WhatsApp (só números)"
            placeholder="558499999999"
            {...field("whatsapp")}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="s-schedule" label="Horário de funcionamento" {...field("schedule")} />
          <Input id="s-admin-pin" label="PIN Administrativo" maxLength={4} {...field("adminPin")} />
        </div>
        <Input id="s-address" label="Endereço" {...field("address")} />
        <Textarea
          id="s-msg"
          label="Mensagem padrão do WhatsApp"
          rows={3}
          {...field("defaultMessage")}
        />
        <Button type="submit" size="lg">
          Salvar alterações
        </Button>
      </form>
    </AdminLayout>
  );
}
