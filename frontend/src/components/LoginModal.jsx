import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useToast } from '../context/ToastContext';
import api from '../api/api';
import ButtonSpinner from './ui/ButtonSpinner';
import {  useAuth } from '../context/AuthContext';



const LoginModal = ({ isOpen, onClose, onSwitch }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const toast = useToast();
    const {setUser} = useAuth();

    const [form, setForm] = useState({
      email: "",
      password: "",
    });

  if (!isOpen) return null;


  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try{
      const res = await api.post("/user/login", {
        email: form.email,
        password: form.password,
      });

      const meRes = await api.get("/user/me");
      setUser(meRes.data.user);

      onClose();
      toast.success(res.data.message);
      setLoading(false);

      setForm({
        email: "",
        password: ""
      })
    } catch(error){
      toast.error(error.response.data.message || "Login Failed")
      setLoading(false);
    }



    
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onMouseDown={onClose}>
      {/* Modal Container */}
      <div className="relative w-full max-w-md p-8 mx-4 bg-slate-100 rounded-2xl shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        
        
        <button 
          onClick={onClose}
          className="absolute text-gray-400 top-4 right-4 hover:text-gray-600 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <div className="text-center mb-8">
          <FontAwesomeIcon icon={faUserCircle} className="text-indigo-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500">Please enter your details</p>
        </div>

      
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input 
              name='email'
              type="email" 
              placeholder="Email Address"
              value={form.email} 
              onChange={handleChange}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex items-center border border-gray-300 gap-3 rounded-lg py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-blue-500 transition-all">
            <span className="text-gray-400 pl-3">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input 
              name='password'
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={form.password}
              onChange={handleChange}
              required= {true}
              className="w-full  bg-transparent outline-none transition-all"
            />
            <button 
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='pr-3 cursor-pointer hover:text-indigo-600 transition-colors'
            ><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
            </button>

          </div>

          <button className={`w-full py-3 font-semibold text-center justify-center text-white ${loading? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} rounded-lg transform hover:scale-[1.02] transition-all shadow-lg`}
                  type='submit'
                  disabled={loading}
          > {loading ? (<><ButtonSpinner/> Signing in... </>): ("Sign In")}
          </button>
        </form>

        {/* Footer / Signup Link */}
        <div className="mt-8 text-center border-t pt-6">
          <p className="text-gray-600">
            Don't have an account? 
            <button className='ml-1 font-bold text-indigo-600 text-center items-center cursor-pointer hover:text-indigo-800'
                onClick={onSwitch}
            >SignUp</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;