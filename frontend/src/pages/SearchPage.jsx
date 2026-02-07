import { useSearchParams } from "react-router-dom";
import { searchPostsApi } from "../api/searchApi";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    let isMounted = true; 

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await searchPostsApi(q);   
        if (isMounted) {
          setPosts(res.data.posts || []);
        }
      } catch (err) {
        console.error("Search failed:", err);
        if (isMounted) {
          setPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [q]);

  if (loading) return <p>Searching...</p>;

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
      {posts.length > 0
        ? posts.map((post) => <PostCard key={post._id} post={post} />)
        : "No post Found"}
    </div>
  );
}
