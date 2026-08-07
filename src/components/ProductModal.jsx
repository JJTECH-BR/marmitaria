import { useEffect, useMemo, useState } from "react";
import { FiMinus, FiPlus, FiCheck, FiChevronRight } from "react-icons/fi";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import { cn } from "../lib/utils";
import { formatPrice } from "../utils/format";
import { FRIES_OPTIONS, PREMIUM_MEATS, SIZES } from "../constants/menu";

const MAX_PROTEINS = 2;

export default function ProductModal({ product, isOpen, onClose, onConfirm, sides = [] }) {
  const isDaily = product?.type === "prato-do-dia";

  const [sizeValue, setSizeValue] = useState(null);
  const [proteins, setProteins] = useState([]);
  const [fries, setFries] = useState("batata-frita");
  const [selectedSides, setSelectedSides] = useState([]);
  const [meatId, setMeatId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (isOpen && product) {
      const firstSize = (product.sizes || []).find((s) => Number(s.price) > 0) || null;
      setSizeValue(firstSize?.value ?? null);
      setProteins([]);
      setFries("batata-frita");
      setSelectedSides([]);
      setMeatId("");
      setQuantity(1);
      setNote("");
    }
  }, [isOpen, product]);

  const availableMeats = useMemo(() => {
    const ids = new Set(product?.meats || []);
    return PREMIUM_MEATS.filter((meat) => ids.has(meat.id));
  }, [product]);

  const size = useMemo(
    () => product?.sizes?.find((s) => s.value === sizeValue) || null,
    [product, sizeValue],
  );

  const pricedSizes = useMemo(
    () => (product?.sizes || []).filter((s) => Number(s.price) > 0),
    [product],
  );

  const hasSizes = pricedSizes.length > 0;

  const meat = useMemo(
    () => availableMeats.find((m) => m.id === meatId) || null,
    [availableMeats, meatId],
  );

  const unitPrice = hasSizes
    ? (size?.price || 0) + (isDaily ? meat?.extra || 0 : 0)
    : Number(product?.price) || 0;
  const total = unitPrice * quantity;

  if (!product) return null;

  const toggleProtein = (name) => {
    setProteins((current) => {
      if (current.includes(name)) return current.filter((p) => p !== name);
      if (current.length >= MAX_PROTEINS) return current;
      return [...current, name];
    });
  };

  const toggleSide = (name) => {
    setSelectedSides((current) =>
      current.includes(name) ? current.filter((s) => s !== name) : [...current, name],
    );
  };

  const handleConfirm = () => {
    const customization = isDaily
      ? {
          size,
          proteins,
          fries,
          sides: selectedSides,
          meat,
        }
      : { size };
    onConfirm(product, quantity, note.trim(), customization);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      footer={
        <Button fullWidth size="lg" disabled={hasSizes && !size} onClick={handleConfirm}>
          Adicionar ao Pedido · {formatPrice(total)}
        </Button>
      }
    >
      {product.image ? (
        <img src={product.image} alt={product.name} className="h-44 w-full object-cover sm:h-56" />
      ) : null}

      <div className="space-y-6 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          {isDaily ? (
            <p className="mt-2 text-sm font-semibold text-primary">
              Acompanha batata frita ou palha, escolha 2 proteínas e os acompanhamentos.
            </p>
          ) : (
            <p className="mt-2 text-xl font-extrabold text-primary">
              {hasSizes
                ? `a partir de ${formatPrice(pricedSizes[0]?.price)}`
                : formatPrice(product.price)}
            </p>
          )}
        </div>

        {hasSizes ? (
          <>
            <OptionGroup title="Escolha o tamanho" required>
              <div
                className={cn("grid gap-2", pricedSizes.length > 2 ? "grid-cols-3" : "grid-cols-2")}
              >
                {pricedSizes.map((option) => (
                  <SizeCard
                    key={option.value}
                    option={option}
                    active={sizeValue === option.value}
                    onClick={() => setSizeValue(option.value)}
                  />
                ))}
              </div>
            </OptionGroup>

            {isDaily ? (
              <>
                {product.proteins?.length ? (
                  <OptionGroup title="Escolha até 2 proteínas" required>
                    <div className="flex flex-wrap gap-2">
                      {product.proteins.map((name) => (
                        <Pill
                          key={name}
                          active={proteins.includes(name)}
                          disabled={proteins.length >= MAX_PROTEINS && !proteins.includes(name)}
                          onClick={() => toggleProtein(name)}
                        >
                          <span>{name}</span>
                          {proteins.includes(name) ? <FiCheck /> : null}
                        </Pill>
                      ))}
                    </div>
                  </OptionGroup>
                ) : null}

                <OptionGroup title="Acompanhamento da casa" required>
                  <div className="grid grid-cols-2 gap-2">
                    {FRIES_OPTIONS.map((option) => (
                      <ChoiceCard
                        key={option.id}
                        label={option.name}
                        active={fries === option.id}
                        onClick={() => setFries(option.id)}
                      />
                    ))}
                  </div>
                </OptionGroup>

                {sides.length ? (
                  <OptionGroup title="Acompanhamentos incluídos" subtitle="Escolha os que quiser">
                    <div className="grid grid-cols-2 gap-2">
                      {sides.map((side) => (
                        <ChoiceCard
                          key={side.id}
                          label={side.name}
                          active={selectedSides.includes(side.name)}
                          onClick={() => toggleSide(side.name)}
                        />
                      ))}
                    </div>
                  </OptionGroup>
                ) : null}

                {availableMeats.length ? (
                  <OptionGroup
                    title="Adicione uma carne com R$ 4 de acréscimo"
                    subtitle="Por pessoa — não é uma porção extra"
                  >
                    <div className="flex flex-wrap gap-2">
                      {availableMeats.map((option) => (
                        <Pill
                          key={option.id}
                          active={meatId === option.id}
                          onClick={() =>
                            setMeatId((current) => (current === option.id ? "" : option.id))
                          }
                        >
                          <span>{option.name}</span>
                          <span className="opacity-80">+{formatPrice(option.extra)}</span>
                        </Pill>
                      ))}
                    </div>
                  </OptionGroup>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}

        <div className="flex items-center justify-between rounded-2xl bg-surface p-3">
          <span className="text-sm font-semibold">Quantidade</span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              aria-label="Diminuir"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              <FiMinus />
            </Button>
            <span className="w-6 text-center text-base font-bold">{quantity}</span>
            <Button
              variant="soft"
              size="icon"
              aria-label="Aumentar"
              onClick={() => setQuantity((value) => value + 1)}
            >
              <FiPlus />
            </Button>
          </div>
        </div>

        <Textarea
          label="Observações"
          placeholder="Ex: sem cebola, ponto da carne..."
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>
    </Modal>
  );
}

function OptionGroup({ title, subtitle, required, children }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold">
          {title}
          {required ? <span className="ml-1 text-primary">*</span> : null}
        </h3>
        {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function SizeCard({ option, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-0.5 rounded-2xl border-2 p-3 transition-all duration-200",
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-card text-foreground hover:border-primary/40",
      )}
    >
      <span className="text-base font-extrabold">{option.label}</span>
      <span className="text-sm font-bold text-primary">{formatPrice(option.price)}</span>
    </button>
  );
}

function ChoiceCard({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-semibold transition-all duration-200",
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-card text-foreground hover:border-primary/40",
      )}
    >
      <span>{label}</span>
      {active ? (
        <FiCheck className="shrink-0" />
      ) : (
        <FiChevronRight className="shrink-0 opacity-40" />
      )}
    </button>
  );
}

function Pill({ active, disabled, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : "border-border bg-card text-foreground hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}
