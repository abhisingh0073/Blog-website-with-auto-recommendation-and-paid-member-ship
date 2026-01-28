import PostCard from "../components/PostCard";

export default function Home() {
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
      {Array.from({ length: 12 }).map((_, i) => (
        <PostCard key={i} />
      ))}
    </div>
  );
}
