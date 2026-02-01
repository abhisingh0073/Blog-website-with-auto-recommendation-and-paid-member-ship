import { useEffect, useState } from "react";
import axios from "axios";

// function App() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3456/recommendations", {
//       withCredentials: true,
//     })
//     .then(res => setPosts(res.data))
//     .catch(err => console.log(err));
//   }, []);

//   return (
//     <div>
//       <h1>Home</h1>
//       {posts.map(post => (
//         <div key={post._id}>
//           <h4>{post._id}</h4>
//           <h3>{post.title}</h3>
//           <p>{post.excerpt}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/UserProfile";
import AppLayout from "./layouts/AppLayOut";
import { useAuth } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import CreatorProfile from "./pages/CreatorProfile";

function App() {

  const { checkingAuth } = useAuth();
  
  if(checkingAuth){
    return <div>Loading....</div>
  }
  return (
    <Routes>
      {/* Layout Route */}
        <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path={"/p/:postId"} element={<Post />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/c" element={<CreatorProfile/>}/>
      </Route>
    </Routes>
  );
}

export default App;
