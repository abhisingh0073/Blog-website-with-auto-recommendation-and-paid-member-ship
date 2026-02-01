import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import PostCardMenuPortal from "./PostCardMenuPortal";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import { useNavigate } from "react-router-dom";



export default function PostCard({ post }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

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
  left: rect.right + 4, // 👈 tiny offset feels natural
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


      <div 
      onClick={() => navigate(`/p/${post._id}`)}
      className="flex flex-col gap-3 cursor-pointer group transition-all duration-300 ease-out hover:-translate-y-1 rounded-xl pb-4 relative">
        
        {/* Thumbnail Section */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200 shadow-sm">
          <img
            src={`http://localhost:3456${post.coverImage}`}
            alt={post.title}
            className="w-full h-full object-cover "
          />
        </div>

        {/* Content Section */}
        <div className="flex gap-3 px-1">
          <div className="flex-shrink-0 pt-1">
            <img
              src={`http://localhost:3456${post.author?.avatar}` || "https://cdn-icons-png.flaticon.com/512/709/709699.png"}
              className="w-9 h-9 rounded-full bg-slate-100 hover:ring-2 ring-slate-200 transition-all"
              onClick={() => navigate(`/c/${post.author._id}`)}
            />
          </div>

          <div className="flex flex-col flex-1 pr-6 relative">
            <h3 className="text-[15px] font-bold text-[#0f0f0f] leading-snug line-clamp-2 mb-1.5">
              {post.title}
            </h3>
            
            <div className="text-[13px] text-[#606060] flex flex-col leading-tight">
              <p className="hover:text-[#0f0f0f] transition-colors font-medium">{post.author?.name}</p>
              <div className="flex items-center mt-0.5 opacity-90">
                <span>{post.views} views</span>
                <span className="mx-1.5 text-[10px]">●</span>
                <span>{formatRelativeTime(post.publishedAt)}</span>
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
        <PostCardMenuPortal position={menuPos} />
      )}

    </>
  );
}