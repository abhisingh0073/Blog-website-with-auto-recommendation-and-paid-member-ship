import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import PostCardMenuPortal from "./UserPostCardMenuPortal";
import EditPostModal from "./EditPostModal";

export default function UserPostCard({ post }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const buttonRef = useRef(null);

  const title = post?.title || "Professional UI Design with React & Tailwind";
  const views = post?.views || "100K";
  const timestamp = post?.timestamp || "2 hours ago";



  const openMenu = (e) => {
    e.stopPropagation();
  const rect = buttonRef.current.getBoundingClientRect();
  const screenHeight = window.innerHeight;
  const menuHeight = 180; 
  const margin = 8;

  const wouldOverflow = rect.bottom + menuHeight > screenHeight;

  setMenuPos({
  top: wouldOverflow
    ? rect.top - menuHeight - margin
    : rect.bottom + margin,
  left: rect.right + 4, 
});


    setMenuOpen(true);
  };



  return (
    <>
     
       {menuOpen && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => setMenuOpen(false)}
        />
      )}


      <div className="flex flex-col gap-3 cursor-pointer group transition-all duration-300 ease-out hover:-translate-y-1 rounded-xl pb-4 relative">
        
        {/* Thumbnail Section */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200 shadow-sm">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ40IqZ50wgWknYL8oI3-qPNjOrM5cEWNR1gw&s"
            alt="Thumbnail"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="flex gap-3 px-1">
          <div className="flex-shrink-0 pt-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
              alt="Channel"
              className="w-9 h-9 rounded-full bg-slate-100 hover:ring-2 ring-slate-200 transition-all"
            />
          </div>

          <div className="flex flex-col flex-1 pr-6 relative">
            <h3 className="text-[15px] font-bold text-[#0f0f0f] leading-snug line-clamp-2 mb-1.5">
              {title}
            </h3>
            
            <div className="text-[13px] text-[#606060] flex flex-col leading-tight">
              <p className="hover:text-[#0f0f0f] transition-colors font-medium">Creator Name</p>
              <div className="flex items-center mt-0.5 opacity-90">
                <span>{views} views</span>
                <span className="mx-1.5 text-[10px]">●</span>
                <span>{timestamp}</span>
              </div>
            </div>

            {/* Menu Button */}
            <button
              ref={buttonRef}
              onClick={openMenu}
              className="absolute -right-2 top-0 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/5"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>

          </div>
        </div>
      </div>

      {menuOpen && (
        <PostCardMenuPortal 
          position={menuPos}
          onEdit= {() => {
            setEditModalOpen(true)
            setMenuOpen(false);
          }}
          />
      )}

      <EditPostModal
       isOpen={editModalOpen}
       onClose={() => setEditModalOpen(false)}
       initialData={post}
      />

    </>
  );
}