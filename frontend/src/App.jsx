import { useEffect, useState } from "react";
import axios from "axios";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/UserProfile";
import AppLayout from "./layouts/AppLayOut";
import { useAuth } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import CreatorProfile from "./pages/CreatorProfile";
import SearchPage from "./pages/SearchPage";
import SavedPost from "./pages/SavedPostPage";
import MyPosts from "./pages/MyPostsPage";
import LikedPost from "./pages/LikedPostPage";

function App() {

  const { checkingAuth } = useAuth();
  // const [theme, setTheme] = useState("light");
  
  if(checkingAuth){
    return <div>Loading....</div>
  }

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   if(savedTheme){
  //     setTheme(savedTheme);
  //   } else{
  //     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //     setTheme(prefersDark ? "dark" : "light");
  //   }
  // }, []);

  // useEffect(() => {
  //   document.body.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);



  return (
    <Routes>
      {/* Layout Route */}
        <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path={"/p/:postId"} element={<Post />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/c/:creatorId" element={<CreatorProfile/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/saved-Post" element={<SavedPost/>}/>
        <Route path="/my-posts" element={<MyPosts/>}/>
        <Route path="/liked-posts" element={<LikedPost/>}/>
      </Route>
    </Routes>
  );
}

export default App;
