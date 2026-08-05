import { useState } from "react";
import { toast } from "sonner";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import AdminLayout from "../../layouts/AdminLayout";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import Input from "../../components/ui/Input";
import EmptyState from "../../components/ui/EmptyState";
import { useApp } from "../../contexts/AppContext";

export default function AdminCategoriesPage() {
  const { categories, products, saveCategory, removeCategory } = useApp();
  const [form, setForm] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      toast.error("Informe o nome da categoria.");
      return;
    }
    saveCategory({ ...form, name: form.name.trim() });
    toast.success(form.id ? "Categoria atualizada" : "Categoria criada");
    setForm(null);
  };

  const handleRemove = () => {
    if (products.some((product) => product.categoryId === confirmId)) {
      toast.error("Existem produtos nesta categoria.");
      setConfirmId(null);
      return;
    }
    removeCategory(confirmId);
    setConfirmId(null);
    toast.success("Categoria excluída");
  };

  return (
    <AdminLayout
      title="Categorias"
      subtitle={`${categories.length} categorias`}
      action={
        <Button onClick={() => setForm({ name: "" })}>
          <FiPlus /> Nova Categoria
        </Button>
      }
    >
      {categories.length ? (
        <ul className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-surface"
            >
              <div>
                <p className="text-sm font-bold">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {products.filter((product) => product.categoryId === category.id).length} produtos
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Editar ${category.name}`}
                  onClick={() => setForm({ ...category })}
                >
                  <FiEdit2 />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Excluir ${category.name}`}
                  onClick={() => setConfirmId(category.id)}
                >
                  <FiTrash2 className="text-destructive" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="Nenhuma categoria" description="Crie a primeira categoria." />
      )}

      <Modal
        isOpen={!!form}
        onClose={() => setForm(null)}
        title={form?.id ? "Editar categoria" : "Nova categoria"}
        className="sm:max-w-sm"
      >
        {form ? (
          <form className="space-y-4 p-5" onSubmit={handleSubmit}>
            <Input
              id="c-name"
              label="Nome"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
            <div className="flex gap-3">
              <Button type="button" variant="outline" fullWidth onClick={() => setForm(null)}>
                Cancelar
              </Button>
              <Button type="submit" fullWidth>
                Salvar
              </Button>
            </div>
          </form>
        ) : null}
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={handleRemove}
        title="Excluir categoria"
        message="A categoria será removida do cardápio."
        confirmLabel="Excluir"
      />
    </AdminLayout>
  );
}
