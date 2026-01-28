// import PostLayouts from "../layouts/PostLayouts";

// export default function Post(){
//     return(
//         <PostLayouts/>
//     )
// }


import PostContent from "../components/post/PostContent";
import PostRightSideBar from "../components/post/PostRightSideBar";

export default function Post() {
  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      
      
      <main className="flex-1 rounded-xl p-6">
        <PostContent />
      </main>

      
      <aside className="w-80 shrink-0 sticky ">
        <PostRightSideBar />
      </aside>

    </div>
  );
}
