/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsPlus } from "react-icons/bs";
import { useModal } from "../context/ModalContext";
import { useSource } from "../context/SourcesContext";
import Source from "../components/Source";
import { useExpense } from "../context/ExpensesContext";
import PieChartComponent from "../components/PieChartComponent";
import { useState } from "react";
import StackedLineChartComponent from "../components/StackedLineChartComponent";

const Sources = (): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { sources } = useSource();

  // @ts-expect-error "unexpected error"
  const { expenses } = useExpense();
  
  // @ts-expect-error "unexpected error"
  const { openModal } = useModal();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const calculateExpenseOfEachSource = () => {
    const sourceExpense = sources.map((source: { _id: string; name: string }) => {
      const sourceExpenses = expenses.filter((expense: { source: any }) => expense.source._id === source._id);
      const totalExpense = sourceExpenses.reduce((acc: number, expense: { amount: number }) => acc + expense.amount, 0);
      return {
        name: source.name,
        value: totalExpense,
      };
    });

    return sourceExpense;
  }

  // calculate expenses for each source for each date of the selected month and year
  const calculateEachSourceExpensesForEachDate = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const eachSourceExpenses = sources.map((source: { _id: string; name: string }) => {
      const sourceExpenses = expenses.filter((expense: { source: any }) => expense.source._id === source._id);
      const sourceExpensesForEachDate = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month - 1, i + 1);
        const totalExpense = sourceExpenses.filter((expense: { date: string }) => new Date(expense.date).getDate() === date.getDate() && new Date(expense.date).getMonth() === date.getMonth() && new Date(expense.date).getFullYear() === date.getFullYear()).reduce((acc: number, expense: { amount: number }) => acc + expense.amount, 0);
        return {
          date: date.toLocaleDateString(),
          value: totalExpense,
        };
      });

      return {
        name: source.name,
        data: sourceExpensesForEachDate,
      };
    });

    return eachSourceExpenses;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-start w-full sm:items-center sm:flex-row sm:space-y-0 space-y-4 sm:justify-between flex-col">
        <h2 className="font-bold text-4xl">Your Sources</h2>
        <button
          className="new-modal flex items-center space-x-1 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => openModal('add-source')}
        >
          <BsPlus
            className="text-white text-xl font-extrabold"
          />
          <p>New</p>
        </button>
      </div>
      <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 items-center justify-center xl:items-start xl:justify-start w-full mt-5 space-x-0 xl:space-x-5 h-full">
        <div className="w-full min-h-56 flex flex-col items-center space-y-10">
          <div className="w-full h-full border-2 rounded-md p-5">
            <PieChartComponent title="Expenses from each source" data={calculateExpenseOfEachSource()} />
          </div>
          <div className="w-full h-full border-2 rounded-md p-5">
            <div className="flex flex-row">
              <h3 className="font-semibold text-lg w-full">
                {`Sources used in ${new Date(new Date().getFullYear(), month-1).toLocaleString('default', { month: 'long' })} ${year}`}
              </h3>
              <div className="flex w-full justify-end space-x-2 mb-4">
                {/* selecting for year */}
                <select className="border-2 p-1 rounded-lg" onChange={(e: any) => setYear(Number(e.target.value))} defaultValue={year}>
                  {Array.from({ length: 90 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
                  ))}
                </select>

                {/* selecting for month */}
                <select className="border-2 p-1 rounded-lg" onChange={(e: any) => setMonth(Number(e.target.value))} defaultValue={month}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>{new Date(new Date().getFullYear(), i).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
              </div>
            </div>

            <StackedLineChartComponent data={calculateEachSourceExpensesForEachDate()} />
          </div>
        </div>
        <div className="flex flex-col space-y-10 h-100 w-full">
          <div className="rounded-md p-4 bg-purple-100 space-y-2 min-h-64 h-auto w-100 overflow-hidden">
            <h3 className="font-semibold text-xl text-purple-700">Your Sources</h3>
            <ul className="overflow-auto xl:h-[710px] max-h-[710px]">
              {
                sources.length ? sources.map((source: any) => (
                    <Source key={source._id} source={source} />
                  )) : (
                  <div className="flex flex-col justify-center items-center m-10 space-y-2">
                    <p className="text-lg font-semibold text-slate-500">No sources added yet.</p>
                  </div>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sources;