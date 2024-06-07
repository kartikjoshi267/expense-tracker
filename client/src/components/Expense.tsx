import { MdOutlineArrowOutward } from "react-icons/md";
import { useModal } from "../context/ModalContext";
import { FaTrashAlt } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Expense = ({ expense }: { expense: any }): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { openModal } = useModal();
  
  return (
    <li className="flex flex-col justify-between mt-2 bg-white p-3 rounded-md cursor-pointer" onClick={() => openModal("edit-expense", expense?._id)}>
      <div className="flex justify-between">
        <p className="text-lg font-semibold">{expense?.title}</p>
        <p className="text-sm font-medium text-gray-500">INR {expense?.amount}</p>
      </div>
      <div className="text-sm font-light flex space-x-1 items-center justify-between">
        <div className="flex">
          <MdOutlineArrowOutward className="text-rose-600 text-lg font-bold" />
          <p>{expense?.source?.name}</p>
        </div>
        <FaTrashAlt className="text-rose-600" onClick={(e) => {
          e.stopPropagation();
          openModal("delete-confirm-expense", expense?._id);
        }} />
      </div>
      <p>{new Date(expense?.date).toDateString()}</p>
    </li>
  );
}

export default Expense;