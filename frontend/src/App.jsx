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

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Post from "./pages/Post";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />}/>
      <Route path="/id" element={<Profile/>}/>
    </Routes>
  );
}

export default App;

