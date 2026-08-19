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
import { PREMIUM_MEATS, PRODUCT_TYPES, SIZES } from "../../constants/menu";
import type { SizeOption } from "../../constants/menu";

interface ProductForm {
  id?: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  available: boolean;
  type: string;
  price: string | number;
  sizes: SizeOption[];
  proteinsText: string;
  meats: string[];
}

interface ProductDisplay {
  id: string;
  name: string;
  description?: string;
  image: string;
  categoryId: string;
  type: string;
  price?: number | string;
  available?: boolean;
  sizes?: SizeOption[];
  proteins?: string[];
  meats?: string[];
  [key: string]: unknown;
}

const EMPTY_PRODUCT: ProductForm = {
  name: "",
  description: "",
  image: "",
  categoryId: "",
  available: true,
  type: "individual",
  price: "",
  sizes: SIZES.map((s) => ({ ...s, price: "" } as SizeOption)),
  proteinsText: "",
  meats: [],
};

function toForm(product: ProductDisplay): ProductForm {
  return {
    name: product.name || "",
    description: product.description || "",
    image: product.image || "",
    categoryId: product.categoryId || "",
    available: product.available ?? true,
    type: product.type || "individual",
    price: product.price ?? "",
    sizes: SIZES.map((s) => {
      const existing = (product.sizes || []).find((item) => item.value === s.value);
      return { ...s, price: existing ? existing.price : "" } as SizeOption;
    }),
    proteinsText: (product.proteins || []).join("\n"),
    meats: [...(product.meats || [])],
  };
}

function fromForm(form: ProductForm): Record<string, unknown> {
  const base = {
    name: form.name.trim(),
    description: form.description.trim(),
    image: form.image.trim(),
    categoryId: form.categoryId,
    available: form.available,
    type: form.type,
  };

  if (form.type === "prato-do-dia") {
    return {
      ...base,
      price: undefined,
      sizes: form.sizes.map((s) => ({
        value: s.value,
        label: s.label,
        price: Number(s.price) || 0,
      })),
      proteins: form.proteinsText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
      meats: [...form.meats],
    };
  }

  if (form.sizes.some((s) => Number(s.price) > 0)) {
    return {
      ...base,
      price: undefined,
      sizes: form.sizes.map((s) => ({
        value: s.value,
        label: s.label,
        price: Number(s.price) || 0,
      })),
    };
  }

  return {
    ...base,
    price: Number(form.price) || 0,
    sizes: undefined,
    proteins: undefined,
    meats: undefined,
  };
}

export default function AdminMenuPage() {
  const { products, categories, categoryName, saveProduct, removeProduct } = useApp();
  const [form, setForm] = useState<ProductForm | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const openNew = () => setForm({ ...EMPTY_PRODUCT, categoryId: categories[0]?.id || "" });
  const patch = (update: Partial<ProductForm>) => setForm((current) => current ? { ...current, ...update } : null);
  const close = () => setForm(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form?.name || !form.categoryId) {
      toast.error("Informe nome e categoria.");
      return;
    }
    if (form.type === "prato-do-dia" && !form.sizes.some((s) => Number(s.price) > 0)) {
      toast.error("Informe o preço de pelo menos um tamanho.");
      return;
    }
    saveProduct({ ...fromForm(form), id: form.id } as Parameters<typeof saveProduct>[0]);
    toast.success(form.id ? "Produto atualizado" : "Produto criado");
    close();
  };

  const handleRemove = () => {
    if (confirmId) {
      removeProduct(confirmId);
      setConfirmId(null);
      toast.success("Produto excluído");
    }
  };

  const displayPrice = (product: ProductDisplay): string => {
    const priced = (product.sizes || []).filter((s) => Number(s.price) > 0);
    if (product.type === "prato-do-dia" || priced.length) {
      const min = Math.min(...priced.map((s) => Number(s.price)), Infinity);
      return Number.isFinite(min) ? `a partir de ${formatPrice(min)}` : "—";
    }
    return formatPrice(product.price);
  };

  const isDaily = form?.type === "prato-do-dia";

  const toggleMeat = (id: string) => {
    if (!form) return;
    const has = form.meats.includes(id);
    patch({ meats: has ? form.meats.filter((m) => m !== id) : [...form.meats, id] });
  };

  return (
    <AdminLayout
      title="Produtos"
      subtitle={`${products.length} produtos no cardápio`}
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
                <th className="px-4 py-3">Tipo</th>
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
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {categoryName(product.categoryId)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="accent">
                      {PRODUCT_TYPES.find((t) => t.id === product.type)?.name || "—"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-bold text-primary">{displayPrice(product)}</td>
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
                        onClick={() => setForm({ ...toForm(product as ProductDisplay), id: product.id })}
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
        onClose={close}
        title={form?.id ? "Editar produto" : "Novo produto"}
        className="sm:max-w-xl"
      >
        {form ? (
          <form className="space-y-4 p-5" onSubmit={handleSubmit}>
            <Input
              id="p-name"
              label="Nome"
              value={form.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => patch({ name: e.target.value })}
            />
            <Textarea
              id="p-desc"
              label="Descrição"
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => patch({ description: e.target.value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                id="p-type"
                label="Tipo"
                value={form.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => patch({ type: e.target.value })}
              >
                {PRODUCT_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Select>
              <Select
                id="p-cat"
                label="Categoria"
                value={form.categoryId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => patch({ categoryId: e.target.value })}
              >
                <option value="">Selecione</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Preço por tamanho
              </span>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {form.sizes.map((size, index) => (
                  <label key={size.value} className="block space-y-1 rounded-xl bg-surface p-3">
                    <span className="text-xs font-bold">{size.label}</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0,00"
                      value={size.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        patch({
                          sizes: form.sizes.map((s, i) =>
                            i === index ? { ...s, price: e.target.value } : s,
                          ),
                        })
                      }
                      className="w-full bg-transparent text-sm font-bold text-primary outline-none"
                    />
                  </label>
                ))}
              </div>
              {!isDaily ? (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Deixe tudo em 0 para usar o preço fixo abaixo.
                </p>
              ) : null}
            </div>

            {isDaily ? (
              <>
                <Textarea
                  id="p-proteins"
                  label="Proteínas (uma por linha)"
                  placeholder={"Frango Grelhado\nCarne de Panela\nPeixe Frito"}
                  value={form.proteinsText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => patch({ proteinsText: e.target.value })}
                />

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Carnes premium (+ R$ 4,00)
                  </span>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {PREMIUM_MEATS.map((meat) => {
                      const checked = form.meats.includes(meat.id);
                      return (
                        <button
                          type="button"
                          key={meat.id}
                          onClick={() => toggleMeat(meat.id)}
                          className={
                            checked
                              ? "flex items-center justify-between rounded-xl border-2 border-primary bg-primary-soft px-3 py-2.5 text-left text-sm font-semibold text-primary"
                              : "flex items-center justify-between rounded-xl border-2 border-border bg-card px-3 py-2.5 text-left text-sm font-semibold text-foreground hover:border-primary/40"
                          }
                        >
                          <span>{meat.name}</span>
                          <span className="text-xs opacity-70">+R$ 4</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <Input
                id="p-price"
                label="Preço fixo"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => patch({ price: e.target.value })}
              />
            )}

            <Input
              id="p-img"
              label="Imagem (URL)"
              placeholder="https://..."
              value={form.image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => patch({ image: e.target.value })}
            />

            <div className="rounded-xl bg-surface p-4">
              <Switch
                label="Disponível"
                checked={form.available}
                onChange={(available: boolean) => patch({ available })}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" fullWidth onClick={close}>
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
