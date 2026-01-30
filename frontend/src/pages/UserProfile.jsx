import { Navigate } from "react-router-dom";
import useUserProfileApi from "../api/userApi";
import UserProfileContent from "../components/Profile/userProfile/UserProfileContent";

import { useToast } from "../context/ToastContext";

export default function UserProfile() {
  const toast = useToast();

const {posts, userData, loading , error} = useUserProfileApi();

if (loading) return <div>Loading...</div>;

if(error){
  return ( <Navigate to={"/"} replace /> )
}

  return (
    <div className="max-w-6xl mx-auto">
      <UserProfileContent 
       posts={posts}
       userData={userData}
      />
    </div>
  );
}
