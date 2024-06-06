import AddExpenseModal from "../../components/modals/AddExpenseModal"
import AddSourceModal from "../../components/modals/AddSourceModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import EditExpenseModal from "../../components/modals/EditExpenseModal";
import EditSourceModal from "../../components/modals/EditSourceModal";

const ModalProvider = () => {
  return (
    <>
      {/* expense related modals */}
      <AddExpenseModal />
      <EditExpenseModal />

      {/* source related modals */}
      <AddSourceModal />
      <EditSourceModal />

      {/* common modals */}
      <DeleteConfirmModal />
    </>
  )
}

export default ModalProvider;