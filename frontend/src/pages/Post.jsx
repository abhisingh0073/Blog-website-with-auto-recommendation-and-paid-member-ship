
import { useParams } from "react-router-dom";
import PostContent from "../components/post/PostContent";
import PostRightSideBar from "../components/post/PostRightSideBar";
import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import { useToast } from "../context/ToastContext";

export default function Post() {

  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [sideBarInfo, setSideBarInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const toast = useToast();

  const hasFetched = useRef(false);

  useEffect(() => {
    if(hasFetched.current) return;
    hasFetched.current = true;

    const fetchPost = async () => {
      try{
        const res = await api.get(`/post/${postId}`,
         { withCredentials: true});
console.log(res);

         setPost(res.data.post);
         setSideBarInfo(res.data.sidebarinfo);
         setUser(res.data.user);

      } catch(err){
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } finally{
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);


  if(loading) return <p>Loading post..</p>;
  if(error) return <p>{error}</p>;

  return (
    <div className="flex gap-6 max-w-8xl mx-auto">
      
      
      <main className="flex-1 rounded-xl p-6 mx-9">
        <PostContent 
        post = {post} 
        user={user}
        />

      </main>

      
      <aside className="w-80 shrink-0 sticky ">
        <PostRightSideBar 
          post = {post}
          reaction = {sideBarInfo}
          user = {user}
        />
      </aside>

    </div>
  );
}
