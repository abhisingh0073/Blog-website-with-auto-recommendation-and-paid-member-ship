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
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import { useToast } from "../../context/ToastContext";
import { followApi, likeApi, readLaterApi } from "../../api/reactionApi";
import { useNavigate } from "react-router-dom";



export default function PostRightSideBar({post , reaction, user}) {

  const [liked, setLiked] = useState(reaction.userReaction); 
  const [saved, setSaved] = useState(reaction.isSaved);
  const [followers, setFollowers] = useState(reaction.totalFollower);
  const [following, setFollowing] = useState(reaction.following);

  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [dislikeCount, setDislikeCount] = useState(post.dislikesCount);

  const toast = useToast();
  const navigate = useNavigate();

    const apiUrl = "http://localhost:3456";


  const toggleFollow = async () => {

    // if(!user){
    //   toast.error("Login to Follow")
    // }else{
      
      try{
         const res = await followApi(post.author._id);
         setFollowing((prev) => !prev);
         setFollowers((prev) => (following ? prev - 1 : prev + 1));
         toast.success(res.data.message);

      }catch(err){
          toast.error(err.response.data.message);  
      }
    // }
    
    
    
  };

 
  const handleLike = async () => {

    try{
      const res = await likeApi(post._id, "like");
      if (liked === "like") {
      setLiked(null);
      setLikeCount((prev) => prev - 1);
    } else {
      if (liked === "dislike") setDislikeCount((prev) => prev - 1);
      setLiked("like");
      setLikeCount((prev) => prev + 1);
    } 

    }catch(err){
      toast.error(err.response.data.message);
    }


  };

  const handleDislike =async () => {
    const res = await likeApi(post._id, "dislike");
    if (liked === "dislike") {
      setLiked(null);
      setDislikeCount((prev) => prev - 1);

    } else {
      if (liked === "like") setLikeCount((prev) => prev - 1);
      setLiked("dislike");
      setDislikeCount((prev) => prev + 1);
    }
  };


  const handleReadLater = async() => {

    try{
      const res = await readLaterApi(post._id);
      setSaved(!saved);
    } catch(err){
      toast.error(err.response.data.message);
    }
  }



  return (
    <aside className="sticky top-0 space-y-6 w-full max-w-[300px]">
      {/* Author Card */}
      <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
        <div className="flex flex-row gap-3 items-center">
           <img
             src={`${apiUrl}${post.author.avatar}`}
              alt="User avatar"
              onClick={() => navigate(`/c/${post.author._id}`)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border border-transparent  hover:border-slate-400 tansition-color"
           />
           <h3 
           onClick={() => navigate(`/c/${post.author._id}`)}
           className="text-lg font-bold text-slate-900 leading-tight cursor-pointer">
              {post.author.name}
             </h3> 
        </div>
        
        <p className="text-sm text-slate-500 mt-1 mb-4">
          {followers.toLocaleString()} followers
        </p>


        {/* follow button */}
        <button
          // disabled={!user || post.author._id === user._id}
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
            <h3 className="text-sm font-medium text-slate-600 ">{post.views} views</h3>
            <span className="text-slate-300">|</span>
            <h3 className="text-sm font-medium text-slate-600">{formatRelativeTime(post.publishedAt)}</h3>
        </div>

        <div className="h-[1px] bg-slate-100 my-1 mx-2" />

       <div className="flex gap-2">

        <ActionButton
          onClick={handleLike}
          active={liked === "like"}
          activeColor="text-indigo-600 bg-indigo-50"
          hoverColor="hover:text-indigo-600 hover:bg-slate-50"
          icon={liked === "like" ? faThumbsUpSolid : faThumbsUp}
          label={likeCount.toLocaleString()}
        />

        {/* Dislike Button */}
        <ActionButton
          onClick={handleDislike}
          active={liked === "dislike"}
          activeColor="text-red-600 bg-red-50"
          hoverColor="hover:text-red-600 hover:bg-slate-50"
          icon={liked === "dislike" ? faThumbsDownSolid : faThumbsDown}
          label={dislikeCount.toLocaleString()}
        />            
        </div>
        
        {/* Like Button */}
        


        <div className="h-[1px] bg-slate-100 my-1 mx-2" />

        {/* Save Button */}
        <ActionButton
          onClick={handleReadLater}
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

    {user && (
      <>
     <img
      src={`${apiUrl}${user.avatar}`}
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
      </>


    )}

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
