import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
  confirmLabel = "Confirmar",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="sm:max-w-sm">
      <p className="p-5 text-sm text-muted-foreground">{message}</p>
      <div className="flex gap-3 border-t border-border p-4">
        <Button variant="outline" fullWidth onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" fullWidth onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
