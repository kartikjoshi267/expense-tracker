/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import { ImCross } from 'react-icons/im';
import { useExpense } from '../../context/ExpensesContext';

const AddExpenseModal = () => {
  // @ts-expect-error "unexpected error"
  const { user } = useUser();

  // @ts-expect-error "unexpected error"
  const { type, isOpen, closeModal } = useModal();
  
  // @ts-expect-error "unexpected error"
  const { addExpense } = useExpense();

  const [newExpenseData, setNewExpenseData] = useState({
    title: '',
    amount: 0,
    sourceId: user && user.sources.length ? user.sources[0]._id : '',
    date: '',
    description: '',
  });

  useEffect(() => {
    setNewExpenseData({
      title: '',
      amount: 0,
      sourceId: user && user.sources.length ? user.sources[0]._id : '',
      date: '',
      description: '',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!user) {
    return null;
  }
  

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewExpenseData({
      ...newExpenseData,
      [e.target.name]: e.target.value,
    });
  }

  if (type !== "add-expense" || !isOpen) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='modal bg-white p-6 rounded-lg shadow-lg w-1/3 min-w-[300px]'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-gray-700'>Add Expense</h1>
          <button onClick={closeModal} className='text-rose-600 hover:text-rose-800'>
            <ImCross />
          </button>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Title</label>
          <input
            type='text'
            placeholder='Title'
            name='title'
            value={newExpenseData.title}
            onChange={onChangeHandler}
            className='w-full p-3 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Amount</label>
          <input
            type='number'
            placeholder='Amount'
            name='amount'
            min={0}
            value={newExpenseData.amount}
            onChange={onChangeHandler}
            className='w-full p-3 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Source</label>
          <select
            onChange={onChangeHandler}
            name='sourceId'
            className='w-full p-3 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          >
            {user.sources.map((source: any) => (
              <option key={source._id} value={source._id}>{source.name}</option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Date</label>
          <input
            type='date'
            name='date'
            max={new Date().toISOString().split('T')[0]}
            value={newExpenseData.date}
            onChange={onChangeHandler}
            className='w-full p-3 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Description</label>
          <textarea
            placeholder='Description'
            name='description'
            value={newExpenseData.description}
            onChange={onChangeHandler}
            className='w-full p-3 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          ></textarea>
        </div>
        <div className='flex justify-end'>
          <button onClick={() => addExpense(newExpenseData)} className='bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition'>
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;