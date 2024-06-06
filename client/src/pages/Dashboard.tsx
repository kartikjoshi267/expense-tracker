/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Source from "../components/Source";
import Expense from "../components/Expense";
import PieChartComponent from "../components/PieChartComponent";
import { useExpense } from "../context/ExpensesContext";
import BarChartComponent from "../components/BarChartComponent";
import { useState } from "react";

const Dashboard = (): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { user } = useUser();

  // @ts-expect-error "unexpected error"
  const { expenses } = useExpense();

  const [days, setDays] = useState(7);

  const calculateExpenseOfEachSource = () => {
    const sources = user.sources;

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

  // last 7 days
  const calculateExpenseAmountForEachDate = () => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - days);
    const lastWeekExpenses = expenses.filter((expense: { date: string }) => new Date(expense.date) >= lastWeek);

    const lastWeekExpensesForEachDate = Array.from({ length: days }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const totalExpense = lastWeekExpenses.filter((expense: { date: string }) => new Date(expense.date).getDate() === date.getDate()).reduce((acc: number, expense: { amount: number }) => acc + expense.amount, 0);
      return {
        name: date.toDateString(),
        value: totalExpense,
      };
    });

    return lastWeekExpensesForEachDate.sort((a: { name: string }, b: { name: string }) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-1">
        <h1 className="font-bold text-4xl">Hi, {user.name} 😀</h1>
        <p className="text-md text-slate-500 font-medium">Here's your personalized dashboard with all your expenses and sources.</p>
      </div>
      <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 items-center justify-center xl:items-start xl:justify-start w-full mt-5 space-x-0 xl:space-x-5 h-full">
        <div className="w-full min-h-56 flex flex-col items-center space-y-10">
          <div className="w-full h-full border-2 rounded-md p-5">
            <PieChartComponent title="Expenses from each source" data={calculateExpenseOfEachSource()} />
          </div>
          <div className="w-full h-full border-2 rounded-md p-5">
            <div className="w-full text-right">
              <select name="days" id="days" value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="bg-white border-2 border-purple-300 p-1 rounded-md focus:outline-none focus:border-purple-500 transition-all">
                <option value="7">Last 7 days</option>
                <option value="15">Last 15 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </div>
            <BarChartComponent title={`Last ${days} Days Expenses`} data={calculateExpenseAmountForEachDate()} />
          </div>
        </div>
        <div className="flex flex-col space-y-10 h-100 w-full">
          <div className="rounded-md p-4 bg-purple-100 space-y-2 min-h-64 h-auto w-100">
            <div className="flex flex-row justify-between items-center">
              <h3 className="font-semibold text-xl text-purple-700">Your Sources</h3>
              <Link to="/sources" className="text-purple-900 font-medium text-md bg-purple-300 p-1 rounded-md hover:bg-purple-500 hover:text-white transition-all">View all</Link>
            </div>
            <ul>
              {user.sources.length ? user.sources.slice(0, 3).map((source: any) => (
                <Source key={source._id} source={source} />
              )) : (
                <div className="flex flex-col justify-center items-center m-10">
                  <p className="text-lg font-semibold text-slate-500">No sources added yet.</p>
                </div>
              )}
            </ul>
          </div>
          <div className="rounded-md p-4 bg-purple-100 space-y-2 min-h-64 h-auto w-100">
            <div className="flex flex-row justify-between items-center">
              <h3 className="font-semibold text-xl text-purple-700">Latest Expenses</h3>
              <Link to="/expenses" className="text-purple-900 font-medium text-md bg-purple-300 p-1 rounded-md hover:bg-purple-500 hover:text-white transition-all">View all</Link>
            </div>
            <ul>
              {
                expenses.length ? expenses.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3).map((expense: any) => (
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

export default Dashboard;