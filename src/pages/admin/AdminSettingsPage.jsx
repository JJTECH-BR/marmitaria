import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../layouts/AdminLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Loading from "../../components/ui/Loading";
import { useApp } from "../../contexts/AppContext";

export default function AdminSettingsPage() {
  const { company, settings, saveCompany, saveSettings, loading } = useApp();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (company) {
      setForm({ ...company, defaultMessage: settings?.defaultMessage || "" });
    }
  }, [company, settings]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { defaultMessage, ...companyData } = form;
    saveCompany(companyData);
    saveSettings({ ...settings, defaultMessage });
    toast.success("Configurações salvas");
  };

  if (loading || !form) {
    return (
      <AdminLayout title="Configurações">
        <Loading />
      </AdminLayout>
    );
  }

  const field = (key) => ({
    value: form[key] || "",
    onChange: (event) => setForm({ ...form, [key]: event.target.value }),
  });

  return (
    <AdminLayout title="Configurações" subtitle="Dados da marmitaria">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-2xl bg-card p-6 shadow-card">
        <Input id="s-name" label="Nome da empresa" {...field("name")} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="s-logo" label="Logo (URL)" {...field("logo")} />
          <Input id="s-banner" label="Banner (URL)" {...field("banner")} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="s-whats"
            label="WhatsApp (só números)"
            placeholder="558499999999"
            {...field("whatsapp")}
          />
          <Input id="s-schedule" label="Horário de funcionamento" {...field("schedule")} />
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
