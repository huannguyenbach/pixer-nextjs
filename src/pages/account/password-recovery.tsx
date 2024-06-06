import { useState } from 'react';
import supabase from '@/utils/supabase/supabaseClient';

export default function PasswordRecovery() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
  
    const handlePasswordChange = async (e) => {
      e.preventDefault();
  
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
  
      if (error) {
        setMessage(error.message);
        setIsError(true);
      } else if (data) {
        setMessage('Password updated successfully!');
        setIsError(false);
      }
    };
  
    return (
      <div className="flex w-full justify-center items-center flex-col">
        <h2 className="mb-4 text-2xl font-bold text-center mt-10">Update Your Password</h2>
        <div className="flex w-[330px] sm:w-[384px] mt-4">
        <form
          onSubmit={handlePasswordChange}
          className="bg-white shadow-md rounded px-8 pt-3 pb-8 mb-4 mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Password
            </button>
          </div>
          {message && (
            <div
              className={`mt-4 border px-4 py-3 rounded relative ${isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}`}
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
        </form>
        
      </div>
      <a href="/" className="mt-10 underline text-blue-500 hover:no-underline text-center text-lg">Back to Home</a>
      </div>
    );
  }