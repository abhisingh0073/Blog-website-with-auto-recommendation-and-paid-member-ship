import { faAngleDown, faAngleUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SidebarFollowing({creator = []}){
  
   const apiUrl = "http://localhost:3456";
   const navigate = useNavigate();
   const [showAll, setShowAll] = useState(false);

   const visibleCreator = showAll ? creator : creator.slice(0, 5);


    return(
        <div
        className="flex flex-col mt-6 justify-center item-center"
        >
          <div className="border-t-1 border-[var(--border-color)]"/>
            <h2
             className="font-semibold flex text-xl text-slate-500 px-3 mb-2 mt-3 gap-3"
            ><FontAwesomeIcon icon={faUser}
             className="w-5"
            /> Following</h2>
            
            <div className="space-y-2 flex flex-col items-center justify-center">
              {visibleCreator.map((user) => (
                <div
                key={user._id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:[var(--hover-bg)] cursor-pointer hover:bg-[var(--hover-bg)] min-w-0"
                onClick={() => navigate(`/c/${user._id}`)}
                >
                    <img src={`${apiUrl}${user.avatar}`} alt={user.name}
                    className="w-9 h-9 rounded-full object-cover "
                    />
                    <span 
                    className="block flex-1 min-w-0 truncate text-sm font-medium text-[var(--text-secondary)]">
                        {user.name}
                    </span>

                </div>
              ))}

              {creator.length>5 && (
                <button
              type="button"
              onClick={() => setShowAll(!showAll)}
               className="flex items-center gap-2 font-bold text-[var(--text-secondary)] cursor-pointer"
              >{showAll ? (
                <>
                Show Less <FontAwesomeIcon icon={faAngleUp} />
                </>
                ) : (
                  <>
                  Show More
                  <FontAwesomeIcon icon={faAngleDown} />
                  </>
                ) }
              
              
              </button>
              )}
              
            </div>
        </div>
    )
}