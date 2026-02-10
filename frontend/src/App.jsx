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
        <Route path="/c/:creatorId" element={<CreatorProfile/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
