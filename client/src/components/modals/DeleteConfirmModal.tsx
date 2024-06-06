import { useExpense } from "../../context/ExpensesContext";
import { useModal } from "../../context/ModalContext";
import { useSource } from "../../context/SourcesContext";

const DeleteConfirmModal = () => {
  // @ts-expect-error "unexpected error"
  const { closeModal, id, type } = useModal();

  // @ts-expect-error "unexpected error"
  const { deleteExpense } = useExpense();

  // @ts-expect-error "unexpected error"
  const { deleteSource } = useSource();

  if (type !== "delete-confirm-expense" && type !== "delete-confirm-source") {
    return null;
  }

  const deleteHandler = async () => {
    if (type === "delete-confirm-expense") {
      await deleteExpense(id);
    } else if (type === "delete-confirm-source") {
      await deleteSource(id);
    } else {
      return;
    }

    closeModal();
  }

  return (
    <div>
      <h2>Are you sure you want to delete this?</h2>
      <button onClick={deleteHandler}>Yes</button>
      <button onClick={() => closeModal()}>No</button>
    </div>
  );
}

export default DeleteConfirmModal;