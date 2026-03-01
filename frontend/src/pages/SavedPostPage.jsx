import recommendationPost from "../api/postApi";
import savedPost from "../api/userApi";
import PostCard from "../components/PostCard";


export default function SavedPost() {
  const {posts, loading, error} = savedPost();
  console.log(posts);

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
