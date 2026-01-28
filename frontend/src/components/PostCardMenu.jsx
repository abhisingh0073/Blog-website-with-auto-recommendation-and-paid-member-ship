import { faBookBookmark, faList, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function PostCardMenu(){

    return(
        
            <div className="absolute right-0 top-10 z-[100] w-52 bg-[#282828] text-white rounded-xl py-2 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-150">
                <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
              <MenuItem icon={faList} label= "Add to queue"/>
              <MenuItem icon={faBookBookmark} label="Save to Library"/>
              <MenuItem icon={faShare} label="Share" /> 
            </div>
       
    )
}

function MenuItem({ icon, label}){
    return(
        <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-left">
            <FontAwesomeIcon icon={icon} className="w-4 opacity-80"/>
            <span>{label}</span>
        </button>
    )
}