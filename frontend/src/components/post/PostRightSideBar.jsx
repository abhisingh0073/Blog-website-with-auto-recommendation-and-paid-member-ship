import {
  faBookmark,
  faComment,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as faThumbsUpSolid,
  faThumbsDown as faThumbsDownSolid,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PostRightSideBar() {
  const [liked, setLiked] = useState(null); 
  const [saved, setSaved] = useState(false);
  const [followers, setFollowers] = useState(128);
  const [following, setFollowing] = useState(false);

  const [likeCount, setLikeCount] = useState(1000);
  const [dislikeCount, setDislikeCount] = useState(100);

  const toggleFollow = () => {
    setFollowing((prev) => !prev);
    setFollowers((prev) => (following ? prev - 1 : prev + 1));
  };

 
  const handleLike = () => {
    if (liked === true) {
      // Un-liking
      setLiked(null);
      setLikeCount((prev) => prev - 1);
    } else {
      // Transitioning from Dislike to Like
      if (liked === false) setDislikeCount((prev) => prev - 1);
      
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleDislike = () => {
    if (liked === false) {
      // Un-disliking
      setLiked(null);
      setDislikeCount((prev) => prev - 1);
    } else {
      // Transitioning from Like to Dislike
      if (liked === true) setLikeCount((prev) => prev - 1);
      
      setLiked(false);
      setDislikeCount((prev) => prev + 1);
    }
  };

  return (
    <aside className="sticky top-0 space-y-6 w-full max-w-[300px]">
      {/* Author Card */}
      <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
        <div className="flex flex-row gap-3 items-center">
           <img
             src="https://i.pravatar.cc/40"
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover"
           />
           <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Abhishek Kumar Singh
             </h3> 
        </div>
        
        <p className="text-sm text-slate-500 mt-1 mb-4">
          {followers.toLocaleString()} followers
        </p>

        <button
          onClick={toggleFollow}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95
            ${following 
              ? "bg-slate-100 text-slate-700 border border-slate-200" 
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"}`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>

      {/* Actions Card */}
      <div className="border border-slate-200 rounded-xl p-2 bg-white shadow-sm overflow-hidden">
        <div className="flex p-3 gap-3 items-center">
            <h3 className="text-sm font-medium text-slate-600 ">100k views</h3>
            <span className="text-slate-300">|</span>
            <h3 className="text-sm font-medium text-slate-600">2 month ago</h3>
        </div>

        <div className="h-[1px] bg-slate-100 my-1 mx-2" />

       <div className="flex gap-2">

        <ActionButton
          onClick={handleLike}
          active={liked === true}
          activeColor="text-indigo-600 bg-indigo-50"
          hoverColor="hover:text-indigo-600 hover:bg-slate-50"
          icon={liked === true ? faThumbsUpSolid : faThumbsUp}
          label={likeCount.toLocaleString()}
        />

        {/* Dislike Button */}
        <ActionButton
          onClick={handleDislike}
          active={liked === false}
          activeColor="text-red-600 bg-red-50"
          hoverColor="hover:text-red-600 hover:bg-slate-50"
          icon={liked === false ? faThumbsDownSolid : faThumbsDown}
          label={dislikeCount.toLocaleString()}
        />            
        </div>
        
        {/* Like Button */}
        


        <div className="h-[1px] bg-slate-100 my-1 mx-2" />

        {/* Save Button */}
        <ActionButton
          onClick={() => setSaved(!saved)}
          active={saved}
          activeColor="text-amber-600 bg-amber-50"
          hoverColor="hover:text-amber-600 hover:bg-slate-50"
          icon={saved ? faBookmarkSolid : faBookmark}
          label={saved ? "Saved" : "Save to Library"}
        />

      </div>


<div className="border border-slate-200 rounded-xl shadow-sm bg-white">
  {/* Header */}
  <div className="flex items-center gap-3 px-4 py-3 text-slate-600 text-sm font-medium">
    <FontAwesomeIcon icon={faComment} className="text-slate-400" />
    <span>12 Comments</span>
  </div>

  <div className="h-px bg-slate-100 mx-4" />

  {/* Add Comment */}
  <div className="flex gap-3 px-4 py-4">
    {/* Avatar */}
    <img
      src="https://i.pravatar.cc/40"
      alt="User avatar"
      className="w-10 h-10 rounded-full object-cover"
    />

    {/* Input */}
    <div className="flex-1">
      <textarea
        rows={2}
        placeholder="Add a comment..."
        className="w-full resize-none text-sm outline-none border-b border-slate-300 focus:border-indigo-500 placeholder-slate-400 pb-1"
      />

      <div className="flex justify-end mt-2">
        <button
          className="px-4 py-1.5 text-sm font-medium rounded-lg
                     bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Comment
        </button>
      </div>
    </div>
  </div>
</div>

    </aside>
  );
}


const ActionButton = ({ onClick, active, icon, label, activeColor, hoverColor }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all text-sm font-medium group
      ${active ? activeColor : `text-slate-600 ${hoverColor}`}`}
  >
    <FontAwesomeIcon 
      icon={icon} 
      className={`text-lg transition-transform duration-200 group-active:scale-90 ${active ? "scale-110" : ""}`} 
    />
    <span>{label}</span>
  </button>
);
