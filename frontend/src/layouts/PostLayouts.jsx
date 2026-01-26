import Navbar from "../components/Navbar";
import PostContent from "../components/post/PostContent";
import PostRightSideBar from "../components/post/PostRightSideBar";

export default function PostLayouts() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      
      <div className="flex flex-1 overflow-hidden">
        
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <PostContent />
        </main>

        
        <aside className="w-80 border-l bg-white p-4">
          <PostRightSideBar />
        </aside>

      </div>
    </div>
  );
}
