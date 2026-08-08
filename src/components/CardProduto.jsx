import { FiPlus } from "react-icons/fi";
import Button from "./ui/Button";
import { formatPrice } from "../utils/format";

export default function CardProduto({ product, onOpen, onAdd }) {
  const pricedSizes = (product.sizes || []).filter((s) => Number(s.price) > 0);
  const hasSizes = pricedSizes.length > 0;
  const minPrice = hasSizes
    ? Math.min(...pricedSizes.map((s) => s.price), Infinity)
    : Number(product.price) || 0;

  return (
    <article
      onClick={() => onOpen(product)}
      className="group flex cursor-pointer gap-3 overflow-hidden rounded-2xl bg-card p-3 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float sm:flex-col sm:p-0"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface sm:h-40 sm:w-full sm:rounded-none">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            Sem imagem
          </div>
        )}
        {hasSizes ? (
          <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground shadow-soft">
            Personalize
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col sm:p-4">
        <h3 className="text-sm font-bold sm:text-base">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex flex-col leading-tight">
            {hasSizes ? (
              <>
                <span className="text-[11px] text-muted-foreground">a partir de</span>
                <span className="text-base font-extrabold text-primary">
                  {formatPrice(minPrice)}
                </span>
              </>
            ) : (
              <span className="text-base font-extrabold text-primary">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              onAdd(product);
            }}
          >
            <FiPlus /> Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}
