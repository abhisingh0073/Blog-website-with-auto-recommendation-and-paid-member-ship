import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightToBracket, faMagnifyingGlass, faPlus, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginModal from "./LoginModal";
import { useState } from "react";
import SignupModal from "./SignupModal";
import CreatePostModal from "./CreatPostModal";
import ProfileModal from "./modal/ProfileModal";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const { user } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

    const apiUrl = "http://localhost:3456";

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  }

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  }


  return (<>
  <header className="h-14 w-full border-b bg-white flex justify-between items-center px-10">
      
      
      <Link to="/" className="font-bold text-xl text-blue-600 cursor-pointer">
       MindPost
      </Link>


      {/* search */}
        <div className="flex items-center gap-2 rounded-full border border-slate-300  focus-within:ring-0 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            className="w-90 flex-1 bg-transparent outline-none text-sm placeholder-gray-400 px-3"
          />

          <button
            type="submit"
            aria-label="Search"
            className="text-black-500 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-r-full border-l border-slate-300 transition"
          ><FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          </div>


    
      <div className="flex items-center gap-5">



        {!user ? (<>
        <button 
             onClick={() => setShowLogin(true)}
             className="px-4 py-1.5 flex gap-1 items-center cursor-pointer border border-slate-300 rounded-full transition duration-300 hover:bg-gray-100 hover:border-blue-600 "><FontAwesomeIcon icon={faArrowRightToBracket} />Login</button>

        <button 
             onClick={() => {setShowSignup(true)}}
             className="px-4 py-1.5 flex gap-1 items-center cursor-pointer border border-slate-300 rounded-full transition duration-300 hover:bg-gray-100 hover:border-blue-600"><FontAwesomeIcon icon={faUserPlus} />SignUp</button>
        
        </>) : (<>
        <button className="px-4 py-1.5 flex gap-1 items-center border border-slate-300 rounded-full hover:bg-gray-100"
            onClick={() => setShowCreate(true)}
        >
          <FontAwesomeIcon icon={faPlus}/>Create
        </button>        
          <button className="text-xl cursor-pointer"><FontAwesomeIcon icon={faBell} /></button>
         <img src= {user ? `${apiUrl}${user.avatar}` : "https://cdn-icons-png.flaticon.com/512/709/709699.png"} alt="" className="w-8 h-8 border border-slate-950 rounded-full cursor-pointer" onClick={() => setShowProfileModal(!showProfileModal)} />
        </>
      )}
 
             
      </div>

    </header>

    <LoginModal
      isOpen={showLogin}
      onClose={() => setShowLogin(false)}
      onSwitch={openSignup}
    />

    <SignupModal
      isOpen={showSignup}
      onClose={() => setShowSignup(false)}
      onSwitch={openLogin}
    />


    <CreatePostModal
      isOpen={showCreate}
      onClose={() => setShowCreate(false)}
    />

    <ProfileModal
    isOpen={showProfileModal}
    onClose={() => setShowProfileModal(false)}
    user={user}
    />
  </>
    



  );
}
