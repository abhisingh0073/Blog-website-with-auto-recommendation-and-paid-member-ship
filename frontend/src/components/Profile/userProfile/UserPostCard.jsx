import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import PostCardMenuPortal from "./UserPostCardMenuPortal";
import EditPostModal from "./EditPostModal";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useToast } from "../../../context/ToastContext";
import { deletePostApi } from "../../../api/postApi";

export default function UserPostCard({ post, onDelete }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openDeleteConfModal, setOpenDeleteConfModal] = useState(false);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  
const toast = useToast();
  const apiUrl = "http://localhost:3456";

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



  const handleConfirmDelete = async () => {
  try {
    const res = await deletePostApi(post._id);
    toast.success(res.data.message);

    onDelete(post._id);                 // 🔥 REMOVE FROM LIST
    setOpenDeleteConfModal(false);
  } catch (err) {
    toast.error(err.response?.data?.message || "Delete failed");
    setOpenDeleteConfModal(false);
  }
};




  return (
    <>
     
       {menuOpen && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => setMenuOpen(false)}
        />
      )}


      <div className="flex flex-col gap-3 cursor-pointer group transition-color duration-200 ease-out hover:-translate-y-1 hover:bg-slate-300/5 rounded-xl pb-4 relative"
          onClick={() => navigate(`/p/${post._id}`)}
          >
        
        {/* cover image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200" >
          <img
            src={`${apiUrl}${post.coverImage}`}
            alt="Thumbnail"
            className="w-full h-full object-cover object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex gap-3 px-1">
          <div className="flex-shrink-0 pt-1"
              onClick={(e) => {
              e.stopPropagation();
              navigate("/profile");
              }}
          >
            <img
              src={`${apiUrl}${post.author.avatar}`}
              alt="Channel"
              className="w-9 h-9 rounded-full hover:ring-1 ring-slate-100 transition-all"
            />
          </div>

          <div className="flex flex-col flex-1 pr-6 relative">
            <h3 className="text-[15px] font-bold leading-snug line-clamp-2 mb-1.5">
              {post.title}
            </h3>
            
            <div className="text-[13px] text-[#606060] flex flex-col leading-tight">
              <p className="hover:text-[#0f0f0f] transition-colors font-medium">{post.author.name}</p>
              <div className="flex items-center mt-0.5 opacity-90">
                <span>{post.views} views</span>
                <span className="mx-1.5 text-[10px]">●</span>
                <span>{post.publishedAt ? formatRelativeTime(post.publishedAt) : formatRelativeTime(post.createdAt) }</span>
              </div>
            </div>

            {/* Menu Button */}
            <button
              ref={buttonRef}
              onClick={openMenu}
              className="absolute -right-2 top-0 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-slate-200/20 cursor-pointer"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>


          </div>
        </div>

        <p className={`absolute top-0 m-2 p-1 font-bold text-xs rounded-lg ${post.status === "private" ? "text-red-700 bg-slate-500/50" :" bg-slate-500/30"} `}>{post.status}</p>
          {post.isMembersOnly && (
            <span className="
                   absolute right-2 bottom-2
                   rounded-md
                   bg-black/60
                   px-2 py-1
                   text-xs font-semibold
                   text-green-400
                   backdrop-blur-sm
                 ">
                   Members only
            </span>              
            )}

      </div>

      {menuOpen && (
        <PostCardMenuPortal 
          position={menuPos}
          onEdit= {() => {
            setEditModalOpen(true)
            setMenuOpen(false);
          }}
          postId={post._id}
          onDelete={onDelete}
          onClose = {() => setMenuOpen(false)}
          setOpenDeleteConfModal={setOpenDeleteConfModal}
          />
      )}

      <EditPostModal
       isOpen={editModalOpen}
       onClose={() => setEditModalOpen(false)}
       initialData={post}
      />


      <DeleteConfirmationModal
      isOpen={openDeleteConfModal}
      onClose={() => setOpenDeleteConfModal(false)}
      onConfirm={handleConfirmDelete}
      />

    </>
  );
}