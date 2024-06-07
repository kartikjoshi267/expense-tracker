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

  // give a styled modal
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='bg-white p-10 rounded-lg'>
        <h2>Are you sure you want to delete this?</h2>
        {/* style these buttons */}
        <div className="
          flex
          justify-end
          space-x-3
          mt-4
        ">
          <button className="rounded-md bg-rose-500 p-2 w-12 text-center text-white hover:bg-rose-600 transition-all" onClick={deleteHandler}>Yes</button>
          <button className="rounded-md bg-purple-500 p-2 w-12 text-center text-white hover:bg-purple-600 transition-all" onClick={() => closeModal()}>No</button>
        </div>
      </div>
    </div>
    // <div>
    //   <h2>Are you sure you want to delete this?</h2>
    //   <button onClick={deleteHandler}>Yes</button>
    //   <button onClick={() => closeModal()}>No</button>
    // </div>
  );
}

export default DeleteConfirmModal;