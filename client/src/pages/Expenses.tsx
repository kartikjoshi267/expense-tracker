/* eslint-disable @typescript-eslint/no-explicit-any */
import Expense from "../components/Expense";
import LineChartComponent from "../components/LineChartComponent";
import { useState } from "react";
import BarChartComponent from "../components/BarChartComponent";
import { useExpense } from "../context/ExpensesContext";
import { BsPlus } from "react-icons/bs";
import { useModal } from "../context/ModalContext";

const Expenses = (): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { expenses } = useExpense();
  
  // @ts-expect-error "unexpected error"
  const { openModal } = useModal();
  
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // last ten expenses added
  const lastTenExpenses = () => {
    const last10Expenses = expenses
      .sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    return last10Expenses.map((expense: any) => ({
      name: expense.source.name,
      value: expense.amount,
    }));
  }

  // calculate expenses for month and year
  const calculateMonthAndYearExpenses = () => {
    const monthExpenses = expenses.filter((expense: any) => new Date(expense.date).getMonth() === month - 1 && new Date(expense.date).getFullYear() === year);

    // output should be an array of { name: string, value: number } where value needs to sum total of amount spent on a date and name should be the date
    // if any date is not found,, then the value for that date should be 0
    const expenseAmountForEachDate = monthExpenses.reduce((acc: { [x: string]: number }, expense: { date: string; amount: number }) => {
      const date = new Date(expense.date);
      if (acc[date.toDateString()]) {
        acc[date.toDateString()] += expense.amount;
      } else {
        acc[date.toDateString()] = expense.amount;
      }
      return acc;
    }, {});

    const monthDates = Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }, (_, i) => new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).toDateString());

    return monthDates.map((date: string) => ({
      name: date,
      value: expenseAmountForEachDate[date] || 0,
    }));
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-start w-full sm:items-center sm:flex-row sm:space-y-0 space-y-4 sm:justify-between flex-col">
        <h2 className="font-bold text-4xl">Your Expenses</h2>
        <button
          className="new-modal flex items-center space-x-1 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => openModal('add-expense')}
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
            <BarChartComponent title="Last 10 Expenses Added" data={lastTenExpenses()} />
          </div>
          <div className="w-full h-full border-2 rounded-md p-5">
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

            <LineChartComponent title={`Expenses of ${new Date(new Date().getFullYear(), month-1).toLocaleString('default', { month: 'long' })} ${year}`} data={calculateMonthAndYearExpenses()} />
          </div>
        </div>
        <div className="flex flex-col space-y-10 h-100 w-full">
          <div className="rounded-md p-4 bg-purple-100 space-y-2 min-h-64 h-auto w-100 overflow-hidden">
            <h3 className="font-semibold text-xl text-purple-700">Your Expenses</h3>
            <ul className="overflow-auto xl:h-[710px] max-h-[710px]">
              {
                expenses.length ? expenses.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense: any) => (
                    <Expense key={expense._id} expense={expense} />
                  )) : (
                  <div className="flex flex-col justify-center items-center m-10 space-y-2">
                    <p className="text-lg font-semibold text-slate-500">No expenses added yet.</p>
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

export default Expenses;