import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import { formatPrice } from "../utils/format";

export default function ProductModal({ product, isOpen, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNote("");
    }
  }, [isOpen, product?.id]);

  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      footer={
        <Button fullWidth size="lg" onClick={() => onConfirm(product, quantity, note.trim())}>
          Adicionar ao Pedido · {formatPrice(product.price * quantity)}
        </Button>
      }
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover sm:h-60"
        />
      ) : null}

      <div className="space-y-5 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="mt-3 text-xl font-extrabold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>

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
