import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { likedPost } from "../api/userApi";


export default function LikedPost() {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const[error, setError] = useState(null);


useEffect(() => {
  const getPosts = async () => {
    try{
      await likedPost().then((res) => setPosts(res.data.posts));
    
    } catch(err){
      setError("Failed to load posts");
    } finally{
      setLoading(false);
    }
  }

  getPosts();
}, []);
 

  if(loading){
    return <p className="text-center mt-10">Loading feed...</p>
  }

   if (error) {
    return <p className="text-center text-red-500">{error}</p>;
}

  return (
    <div
      className="
        px-6
        grid grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-x-4 gap-y-8
      "
    >
      {posts.map((post) => (
        <PostCard key={post._id} post={post}/>
      ))}
    </div>
  );
}
