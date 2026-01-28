import { faBookBookmark, faList, faPen, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function UserPostCardMenu({onEdit}){

    return(
        
            <div className="absolute right-0 top-10 z-[100] w-52 bg-[#282828] text-white rounded-xl py-2 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-150">
                <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
              <MenuItem icon={faList} label= "Add to queue" css="hover:bg-white/10"/>
              <MenuItem icon={faBookBookmark} label="Save to Library" css="hover:bg-white/10"/>
              <MenuItem icon={faShare} label="Share" css="hover:bg-white/10" /> 
              <MenuItem icon={faPen} label="Edit" 
                   css="hover:bg-white/10"
                   onClick={onEdit}
                   /> 
              <MenuItem icon={faTrash} 
                   label="Delete" 
                   css="hover:bg-red-400/50 text-red-600"
                   />
            </div>
       
    )
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