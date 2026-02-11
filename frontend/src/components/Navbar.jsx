import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightToBracket, faMagnifyingGlass, faPlus, faRightToBracket, faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginModal from "./LoginModal";
import { useState, useRef, useEffect } from "react";
import SignupModal from "./SignupModal";
import CreatePostModal from "./CreatPostModal";
import ProfileModal from "./modal/ProfileModal";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useDebounce from "./Search/useDebounce";
import { suggestionsApi } from "../api/searchApi";
import socket from "../socket";
import { useToast } from "../context/ToastContext";
import { notificationApi } from "../api/notificationApi";
import NotificationModal from "./ui/NotificationModal";
import api from "../api/api";


export default function Navbar() {

  const { user } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query, 300);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const apiUrl = "http://localhost:3456";
  const toast = useToast();

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  }

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  }


  const handleSearch = (e) => {
    e.preventDefault();
    if(!query.trim()) return;

    navigate(`search?q=${encodeURIComponent(query)}`);
  }


  useEffect(() => {
    if(!debouncedQuery){
      setSuggestions([]);
      return;
    }
    suggestionsApi(debouncedQuery)
        .then(res => setSuggestions(res.data.suggestions))
        .catch(err => {
          console.error(err);
          setSuggestions([]);
        })

  }, [debouncedQuery]);



useEffect(() => {
  const fetchNotification = async () => {
    try{
      const res = await notificationApi();
      const list = Array.isArray(res.data.notifications) ? res.data.notifications : [];
       setNotifications(list);
       setUnreadCount(res.data.unreadCount);

    } catch(err){
      console.err("Failed to fetch notification", err);
    }

  }
  
  if(user?._id){
     fetchNotification(); 
     socket.emit("join", user._id);
  }
}, [user]);



const handelOpenNotification = async () => {
    setNotificationOpen(prev => !prev);

    if(unreadCount > 0){
      await api.put("/notification/read");

      setUnreadCount(0);
      // setNotifications(prev => 
      //   prev.map(n => ({...n, isRead: true}))
      // );
    }
  }






useEffect(() => {
  socket.on("notification", (data) => {
    console.log("it is notification server is running");
    console.log("New notification:", data);

    // setNotifications((prev) => [data, ...prev]);
    setNotifications((prev) => {
  const safePrev = Array.isArray(prev) ? prev : [];
  return [data, ...safePrev];
});

    setUnreadCount((prev) => prev+1);

    toast.success(data.message);
  });

  return () => {
    socket.off("notification");
  }
}, []);



  return (<>
  <header className="h-14 w-full border-b bg-white flex justify-between items-center px-10">
      
      
      <Link to="/" className="font-bold text-xl text-blue-600 cursor-pointer">
       MindPost
      </Link>

{/* search section */}
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center gap-2 rounded-full border border-slate-300  focus-within:ring-0 focus-within:ring-blue-500 focus-within:border-blue-500 transition relative">
          <input
            type="text"
            value={query}
            placeholder="Search"
            aria-label="Search"
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            className="w-90 flex-1 bg-transparent outline-none text-sm placeholder-gray-400 px-3 font-semibold"
          />
          {suggestions.length>0 && (
            <div className="absolute top-full mt-1 left-0 bg-white text-sm font-semibold shadow rounded-lg w-full z-50 overflow-hidden">
              {suggestions.map((s, i) => (
                <div 
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                         setQuery(s.text);
                         setSuggestions([]);
                         navigate(`/search?q=${encodeURIComponent(s.text)}`);
                        
                        }}
                >
                  {s.text}
                </div>
              ))}
            </div>
            )}



          <div className="p-0.3 w-5 items-center justify-center">
            {query.trim() !== "" && (<button
             type="button"
             onClick={() => {
              setQuery("")
              inputRef.current?.focus();
              setSuggestions([]);
            }}
              className="cursor-pointer text-slate-400 font-semibold hover:text-slate-500"
              ><FontAwesomeIcon icon={faTimes} /></button>)
             }          
          </div>

          
          <button
            type="submit"
            aria-label="Search"
            className="text-black-500 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-r-full border-l border-slate-300 transition"
          ><FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          </div>
        </form>



    
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

          <button
          onClick={handelOpenNotification} 
          className="text-xl cursor-pointer relative">
            { unreadCount>0 && (
               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm px-1.5 rounded-full">{unreadCount}</span>
            )}
            <FontAwesomeIcon icon={faBell} />
            </button>

         <img src= {user ? `${apiUrl}${user.avatar}` : "https://cdn-icons-png.flaticon.com/512/709/709699.png"} alt="" 
              className="w-10 h-10 rounded-full object-cover border border-slate-950 rounded-full cursor-pointer " 
              onClick={() => setShowProfileModal(!showProfileModal)} />
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

    <NotificationModal 
    isOpen={notificationOpen}
    onClose = {() => setNotificationOpen(false)}
    notifications = {notifications}/>
  </>
    



  );
}
