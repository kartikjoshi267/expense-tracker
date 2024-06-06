/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import { ImCross } from 'react-icons/im';
import { useSource } from '../../context/SourcesContext';

const AddSourceModal = () => {
  // @ts-expect-error "unexpected error"
  const { user } = useUser();

  // @ts-expect-error "unexpected error"
  const { type, isOpen, closeModal } = useModal();
  
  // @ts-expect-error "unexpected error"
  const { addSource, types } = useSource();

  const [newSourceData, setNewSourceData] = useState({
    name: '',
    type: types && types.length > 0 ? types[0] : '',
  });

  if (!user) {
    return null;
  }
  

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewSourceData({
      ...newSourceData,
      [e.target.name]: e.target.value,
    });
  }

  if (type !== "add-source" || !isOpen) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='modal bg-white p-6 rounded-lg shadow-lg w-1/3 min-w-[300px]'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-gray-700'>Add Source</h1>
          <button onClick={closeModal} className='text-rose-600 hover:text-rose-800'>
            <ImCross />
          </button>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Name</label>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={newSourceData.name}
            onChange={onChangeHandler}
            className='w-full p-3 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-600 mb-1'>Type</label>
          <select
            onChange={onChangeHandler}
            name='type'
            className='w-full p-3 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
          >
            {types.map((type: any) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className='flex justify-end'>
          <button onClick={() => {
            addSource(newSourceData);
            setNewSourceData({
              name: '',
              type: types && types.length > 0 ? types[0] : '',
            });
          }} className='bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition'>
            Add Source
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSourceModal;