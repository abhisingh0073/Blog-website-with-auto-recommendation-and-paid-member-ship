import { faMoon, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "../../context/ToastContext";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function ProfileModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const toast = useToast();

  const navigate = useNavigate();


  const handleLogout = async () => {
    try{
      const res = await api.get("/user/logout");
      onClose();
      toast.success(res.data.message);
      window.location.href = "/";
    } catch(error){
      toast.error(error.response.data.message || "Logout Failed");
    }
  }

  const handleProfilePage = async() => {
    onClose();
    navigate("/profile");
  }



  return (
    <div className="fixed inset-0 z-[1000] bg-transparent" onClick={onClose}>
     
      <div 
        className="absolute right-6 top-16 w-72 bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className="flex items-center gap-3 p-3 mb-1">
          <img 
            src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/709/709699.png"} 
            alt="Profile"
            className="w-10 h-10 rounded-full border border-slate-600 object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-bold text-sm leading-tight">{user?.name || "User" }</h3>
            <span className="text-xs text-slate-400">@abhishek_dev</span>
          </div>
        </div>

        <div className="border-b border-slate-700 my-1 mx-2" />

        
        <div className="flex flex-col gap-1">
          <MenuButton icon={faUser} label="Your Profile" onClick={handleProfilePage} />
          <MenuButton icon={faMoon} label="Dark Mode" onClick={() => {}} />
          
          <div className="border-b border-slate-700 my-1 mx-2" />
          
          <MenuButton 
            icon={faSignOutAlt} 
            label="Sign Out" 
            css="text-red-400 hover:bg-red-500/10" 
            onClick={handleLogout} 
          />
        </div>
      </div>
    </div>
  );
}

// Helper component for cleaner code
function MenuButton({ icon, label, onClick, css = "hover:bg-slate-800" }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer ${css}`}
    >
      <FontAwesomeIcon icon={icon} className="w-4 opacity-70" />
      <span>{label}</span>
    </button>
  );
}