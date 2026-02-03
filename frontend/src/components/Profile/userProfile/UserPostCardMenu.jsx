import { faBookmark, faList, faPen, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useToast } from "../../../context/ToastContext";
import { readLaterApi } from "../../../api/reactionApi";
// import { deletePostApi } from "../../../api/postApi";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";


export default function UserPostCardMenu({onEdit, postId, isSaved, onSavedChange, onClose, setOpenDeleteConfModal}){

  const [saved, setSaved] = useState(isSaved);
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);



  const handleReadLater = async () => {
    try {
      const res = await readLaterApi(postId);
      console.log(res);
      setSaved(!saved);
      onSavedChange(!saved);
      toast.success(res.data.message);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };



  return (
    <div className="w-52 bg-[#282828] text-white rounded-xl py-2 shadow-2xl">
      
    <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
             <ActionButton
                 onClick={handleReadLater}
                 active={saved}
                 icon={saved ? faBookmark : faBookmark}
                 label={saved ? "Saved" : "Save to Library"}
               />
              <MenuItem 
               icon={faList} 
               label= "Add to queue" 
               css="hover:bg-white/10"/>

              <MenuItem 
               icon={faShare} 
               label="Share" 
               css="hover:bg-white/10" />

              <MenuItem 
               
               icon={faPen} 
               label="Edit" 
               css="hover:bg-white/10"
               onClick={onEdit}/> 

              <MenuItem 
               onClick={() => setOpenDeleteConfModal(true)}
               icon={faTrash} 
               label="Delete" 
               css="hover:bg-red-400/50 text-red-600"
                   />
     
    </div>
  );
}


function MenuItem({ icon, label, css, onClick}){
    return(
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 ${css} transition-colors text-left`}>
            <FontAwesomeIcon icon={icon} className="w-4 opacity-80"/>
            <span>{label}</span>
        </button>
    )
}

const ActionButton = ({ onClick, active, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm
      ${active ? "text-amber-500" : "text-white hover:bg-white/10"}`}
  >
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </button>
);

