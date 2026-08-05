import { useState } from "react";
import { toast } from "sonner";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import AdminLayout from "../../layouts/AdminLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import Input, { Select } from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Switch from "../../components/ui/Switch";
import EmptyState from "../../components/ui/EmptyState";
import { useApp } from "../../contexts/AppContext";
import { formatPrice } from "../../utils/format";

const EMPTY_PRODUCT = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  image: "",
  available: true,
};

export default function AdminMenuPage() {
  const { products, categories, categoryName, saveProduct, removeProduct } = useApp();
  const [form, setForm] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const openNew = () =>
    setForm({ ...EMPTY_PRODUCT, categoryId: categories[0]?.id || "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.categoryId) {
      toast.error("Informe nome e categoria.");
      return;
    }
    saveProduct({ ...form, price: Number(form.price) || 0 });
    toast.success(form.id ? "Produto atualizado" : "Produto criado");
    setForm(null);
  };

  const handleRemove = () => {
    removeProduct(confirmId);
    setConfirmId(null);
    toast.success("Produto excluído");
  };

  return (
    <AdminLayout
      title="Cardápio"
      subtitle={`${products.length} produtos cadastrados`}
      action={
        <Button onClick={openNew}>
          <FiPlus /> Novo Produto
        </Button>
      }
    >
      {products.length ? (
        <div className="overflow-x-auto rounded-2xl bg-card shadow-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Disponível</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 overflow-hidden rounded-xl bg-surface">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <span className="font-semibold">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {categoryName(product.categoryId)}
                  </td>
                  <td className="px-4 py-3 font-bold text-primary">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={product.available ? "success" : "danger"}>
                      {product.available ? "Sim" : "Não"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={`Editar ${product.name}`}
                        onClick={() => setForm({ ...product })}
                      >
                        <FiEdit2 />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Excluir ${product.name}`}
                        onClick={() => setConfirmId(product.id)}
                      >
                        <FiTrash2 className="text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="Nenhum produto"
          description="Cadastre o primeiro item do cardápio."
          action={<Button onClick={openNew}>Novo Produto</Button>}
        />
      )}

      <Modal
        isOpen={!!form}
        onClose={() => setForm(null)}
        title={form?.id ? "Editar produto" : "Novo produto"}
      >
        {form ? (
          <form className="space-y-4 p-5" onSubmit={handleSubmit}>
            <Input
              id="p-name"
              label="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Textarea
              id="p-desc"
              label="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="p-price"
                label="Preço"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <Select
                id="p-cat"
                label="Categoria"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">Selecione</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <Input
              id="p-img"
              label="Imagem (URL)"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <div className="rounded-xl bg-surface p-4">
              <Switch
                label="Disponível"
                checked={form.available}
                onChange={(available) => setForm({ ...form, available })}
              />
            </div>
            <div className="flex gap-3 pt-2">
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
        title="Excluir produto"
        message="Essa ação não pode ser desfeita."
        confirmLabel="Excluir"
      />
    </AdminLayout>
  );
}
