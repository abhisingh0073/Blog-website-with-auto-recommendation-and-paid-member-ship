import { faEnvelope, faEye, faEyeSlash, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "../context/ToastContext.jsx";

import { useState } from "react";
import api from "../api/api.js";


const SignupModal = ({isOpen, onClose, onSwitch}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const toast = useToast();

    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });


    if(!isOpen){
        return null;
    }


    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      if(form.password==="") {
        alert("Passwords cannot be empty");
        return;
      }
      if(form.password !== form.confirmPassword){
        alert("Password do not match");
        return;
      }

      setLoading(true);

      try{
        const res = await api.post("/user/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        

        onClose();
        toast.success(res.data.message);
        setLoading(false);
        window.location.reload();
        
        
      } catch(err) {
        toast.error(err.response?.data?.message || "Signup failed");
        setLoading(false);
      }

     
    }


    return(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-color)]/70 backdrop-blur-sm"
          onClick={onClose}
        >

            <div
              className="relative w-full max-w-md p-8 py-6 mx-4 bg-slate-100 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute text-gray-400 top-4 right-4 hover:text-gray-600 transition-colors">
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>

                <div className="text-center mb-6">
                    <FontAwesomeIcon icon={faUserCircle} className="text-indigo-600 text-5xl mb-2"/>
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input 
                          name="name"
                          type="text"
                          value={form.name} 
                          onChange={handleChange}
                          placeholder="Name" 
                          className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input 
                          name="email"
                          type="email" 
                          placeholder="Email Address" 
                          value={form.email}
                          onChange={handleChange}
                          className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    


                    {/* password */}

                  <div className="flex items-center border border-gray-300 gap-3 rounded-lg py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-blue-500 transition-all">
                    <span className="text-gray-400 pl-3">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input 
                      name="password"
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      value={form.password}
                      onChange={handleChange}
                      className="w-full  bg-transparent outline-none transition-all"
                    />
                    <button 
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='pr-3 cursor-pointer hover:text-indigo-600 transition-colors'
                    ><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                    </button>
                  </div>

                  <div className="flex items-center border border-gray-300 gap-3 rounded-lg py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-blue-500 transition-all">
                    <span className="text-gray-400 pl-3">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input 
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"} 
                      placeholder="Confirm Password" 
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full  bg-transparent outline-none transition-all"
                    />
                    <button 
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='pr-3 cursor-pointer hover:text-indigo-600 transition-colors'
                    ><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                    </button>
                  </div>

                  <button type="submit"
                          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg"
                  >{loading ? "Creating..." : "Create Account" }</button>

                </form>

                <button
                   className="w-full mt-4 py-2 rounded-lg cursor-pointer flex items-center justify-center font-medium text-gray-700 bg-white border border-indigo-300 hover:bg-gray-100 transition-all duration-300"
                >Signup with Google</button>

                <div className="mt-3 text-center border-t pt-3">
                    <p className="text-gray-600">
                    Already have an account? 
                    <button className='ml-1 font-bold text-indigo-600 text-center items-center cursor-pointer hover:text-indigo-800'
                    onClick={onSwitch}
                   >Login</button>
                   </p>
                   </div>

            </div>

        </div>
    )
}

export default SignupModal