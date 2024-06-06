import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../context/UserContext';

const Register = (): React.ReactNode => {
  // @ts-expect-error "unexpected ts error"
  const { register } = useUser();

  const [credentials, setCredentials] = useState({
    title: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <div className="h-full flex items-center justify-center bg-purple-200">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-1/4 min-w-[300px]">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-500">Register</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChangeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChangeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChangeHandler}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between md:flex-row flex-col md:space-y-0 space-y-4">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => register(credentials)}
              >
                Register
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
                to="/login"
              >
                Not new? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
