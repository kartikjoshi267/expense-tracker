/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTrashAlt } from "react-icons/fa";
import { useExpense } from "../context/ExpensesContext";
import { useModal } from "../context/ModalContext";

const Source = ({ source }: { source: any }): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { expenses } = useExpense();

  // @ts-expect-error "unexpected error"
  const { openModal } = useModal();

  const calculateTotalAmount = () => {
    const currentSourceExpenses = expenses.filter((expense: any) => expense.source._id === source._id);
    return currentSourceExpenses.reduce((acc: number, expense: { amount: number }) => acc + expense.amount, 0);
  }

  return (
    <li className="flex flex-col justify-between mt-2 bg-white p-3 rounded-md cursor-pointer" onClick={() => openModal("edit-source", source._id)}>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{source.name}</p>
        <p className="text-sm font-medium text-gray-500">INR {calculateTotalAmount()}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-xs font-normal bg-purple-600 w-fit text-white p-1 rounded-md select-none">{source.type}</p>
        <FaTrashAlt className="text-rose-600" onClick={(e) => {
          e.stopPropagation();
          openModal("delete-confirm-source", source._id);
        }} />
      </div>
    </li>
  );
}

export default Source;