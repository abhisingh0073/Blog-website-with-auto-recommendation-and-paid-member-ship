import {
  faBookmark,
  faComment,
  faHeart,
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
import { SubscriptionModal } from "../SubscriptionModal";
import { commentLikeApi, getCommentApi, postCommentApi } from "../../api/commentApi";
import { useEffect } from "react";



export default function PostRightSideBar({post , reaction, user}) {

  const [liked, setLiked] = useState(reaction.userReaction); 
  const [saved, setSaved] = useState(reaction.isSaved);
  const [followers, setFollowers] = useState(reaction.totalFollower);
  const [following, setFollowing] = useState(reaction.following);

  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [dislikeCount, setDislikeCount] = useState(post.dislikesCount);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [membershipJoin , setMembershipJoin] = useState(reaction.membershipJoin);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [commentLikeActive, setCommentLikeActive] = useState(false);
  

  const toast = useToast();
  const navigate = useNavigate();

    const apiUrl = "http://localhost:3456";


  const toggleFollow = async () => {
      
      try{
         const res = await followApi(post.author._id);
         setFollowing((prev) => !prev);
         setFollowers((prev) => (following ? prev - 1 : prev + 1));
         toast.success(res.data.message);

      }catch(err){
          toast.error(err.response.data.message);  
      }

    
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



  const handleCommentButton = async (e) => {
    e.preventDefault();

    if(!currentComment.trim()) return;

    try{
      const res = await postCommentApi(post._id, currentComment);
      setComments((prev) => [
        {
       ... res.data.populatedComment,
       likesCount: 0,
       isLikedByMe: false,
      },
      
      ...prev])
      setCurrentComment("");
      toast.success(res.data.message);

    } catch(err){
      toast.error(err.response.data.message || "Failed to post comment");
    }
  }



const handleCommentLike = async (commentId) => {
  try {
    const res = await commentLikeApi(commentId);
    const { likesCount, liked } = res.data;

    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId
          ? { ...c, likesCount, isLikedByMe: liked }
          : c
      )
    );
  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};









  useEffect(() => {
   
    const fetchComment = async () => {
      try{
        const resComment = await getCommentApi(post._id);
        setComments((resComment.data.comments || []).map(c => ({
          ...c,
          likesCount: c.likesCount ?? 0,
          isLikedByMe: !!c.isLikedByMe,
        })));      
      
      }catch(err){
        toast.error(err.response.data.message || "Something went wrong to Comment");
      }

    }

    fetchComment();

  }, [post._id]);



  return (
    <>
    <aside className="sticky top-0 space-y-6 w-full max-w-[300px]">
      
      <div className="border border-[var(--border-color)] rounded-xl p-5 bg-[var(--bg-surface)] shadow-sm">
        <div className="flex flex-row gap-3 items-center">
           <img
             src={`${apiUrl}${post.author.avatar}`}
              alt="User avatar"
              onClick={() => navigate(`/c/${post.author._id}`)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border border-[var(--border-color)]  hover:border-[var(--hover-bg)] tansition-color"
           />
           <h3 
           onClick={() => navigate(`/c/${post.author._id}`)}
           className="text-lg font-bold text-[var(--text-primary)] leading-tight cursor-pointer">
              {post.author.name}
             </h3> 
        </div>
        
        <p className="text-sm text-[var(--text-secondary)] mt-1 mb-4">
          {followers.toLocaleString()} followers
        </p>


        {/* follow button */}
        <button
          onClick={toggleFollow}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95
            ${following 
              ? "bg-slate-100 text-slate-700 border border-[var(--border-color)]" 
              : "bg-indigo-600 text-white hover:bg-indigo-700 "}`}
        >
          {following ? "Following" : "Follow"}
        </button>
        <button
          onClick={() => setSubscriptionModal(true)}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all bg-green-600 text-[var(--text-primary)] cursor-pointer mt-2 hover:bg-green-500"
        >{membershipJoin ? "Already Joined": "Join Subscription"}</button>
      </div>

      {/* Actions Card */}
      <div className="border border-[var(--border-color)] rounded-xl p-2 bg-[var(--bg-surface)] shadow-sm overflow-hidden">
        <div className="flex p-3 gap-3 items-center">
            <h3 className="text-sm font-medium text-[var(--text-secondary)] ">{post.views} views</h3>
            <span className="text-[var(--text-secondary)]">|</span>
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">{formatRelativeTime(post.publishedAt)}</h3>
        </div>

        <div className="h-[1px] bg-[var(--border-color)] my-1 mx-2" />

       <div className="flex gap-2">

        <ActionButton
          onClick={handleLike}
          active={liked === "like"}
          activeColor="text-indigo-600 bg-[var(--bg-secondary)]"
          hoverColor="hover:text-indigo-600 hover:bg-[var(--hover-bg)]"
          icon={liked === "like" ? faThumbsUpSolid : faThumbsUp}
          label={likeCount.toLocaleString()}
        />

        {/* Dislike Button */}
        <ActionButton
          onClick={handleDislike}
          active={liked === "dislike"}
          activeColor="text-red-600 bg-[var(--bg-secondary)]"
          hoverColor="hover:text-red-600 hover:bg-[var(--hover-bg)]"
          icon={liked === "dislike" ? faThumbsDownSolid : faThumbsDown}
          label={dislikeCount.toLocaleString()}
        />            
        </div>
        
        {/* Like Button */}
        


        <div className="h-[1px] bg-[var(--border-color)] my-1 mx-2" />

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


<div className="border border-[var(--border-color)] rounded-xl shadow-sm bg-[var(--bg-surface)]">
  
  <div className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] text-sm font-medium">
    <FontAwesomeIcon icon={faComment} className="text-[var(--text-secondary)]" />
    <span>{comments.length} Comments</span>
  </div>

  <div className="h-px bg-[var(--border-color)] mx-4" />

   <form action="" onSubmit={handleCommentButton}>
      <div className="flex gap-3 px-4 py-4">
    {user && (
      <>
     <img
      src={`${apiUrl}${user.avatar}`}
      alt="User avatar"
      className="w-10 h-10 rounded-full object-cover"
    />


    <div className="flex-1">
      <textarea
        value={currentComment}
        rows={2}
        placeholder="Add a comment..."
        onChange={(e) => setCurrentComment(e.target.value)}
        className="w-full resize-none text-sm outline-none border-b border-[var(--border-color)] focus:border-indigo-500 placeholder-slate-400 pb-1"
      />

      <div className="flex justify-end mt-2">
        <button
        type="submit"
          className="px-4 py-1.5 text-sm font-medium rounded-lg
                     bg-indigo-600 text-[var(--text-primary)] hover:bg-indigo-700 transition"
        >
          Comment
        </button>
      </div>
    </div>     
      </>
    )}

      </div>
   </form>

  


   <div className="max-h-80 overflow-y-auto no-scrollbar">
  {comments.map((c, index) => (
    <div
      key={c._id}
      className="flex gap-3 px-4 py-3 border-b border-[var(--border-color)] last:border-b-0"
    >
     
      <img
        src={`${apiUrl}${c.user.avatar}`}
        alt={c.user.name}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {c.user.name}
          </p>
          <span className="text-xs text-[var(--text-secondary)]">{formatRelativeTime(c.createdAt).toString()}</span>
        </div>

        <p className="text-sm text-[var(--text-primary)] leading-relaxed mt-0.5">
          {c.comment}
        </p>
      </div>

      <div className="flex flex-col text-center">
        <button 
          onClick={() => handleCommentLike(c._id)}
          className={`${c.isLikedByMe ? "text-rose-500" : "text-[var(--text-secondary)]"} hover:text-rose-500 transition`}>
          <FontAwesomeIcon icon={faHeart} />
        </button> 
        <p className="text-xs text-slate-400 ">{c.likesCount || 0}</p>
     
      </div>

    </div>
  ))}
</div>


</div>

    </aside>    
    <SubscriptionModal
    isOpen={subscriptionModal}
    onClose = {() => setSubscriptionModal(false)}
    creatorId = {post.author._id}
    />    
    
    </>


    
  );
}


const ActionButton = ({ onClick, active, icon, label, activeColor, hoverColor }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all text-sm font-medium group
      ${active ? activeColor : `text-[var(--text-secondary)] ${hoverColor}`}`}
  >
    <FontAwesomeIcon 
      icon={icon} 
      className={`text-lg transition-transform duration-200 group-active:scale-90 ${active ? "scale-110" : ""}`} 
    />
    <span>{label}</span>
  </button>
);
