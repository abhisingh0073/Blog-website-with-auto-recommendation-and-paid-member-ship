import { Navigate } from "react-router-dom";
import { userProfileApi } from "../api/userApi";
import UserProfileContent from "../components/Profile/userProfile/UserProfileContent";

import { useToast } from "../context/ToastContext";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const toast = useToast();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

// const { userData } = useUserProfileApi();

useEffect( () => {
  const userData = async () => {
    try{
      const res = await userProfileApi();
      setUser(res.data.user);
    } catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }

  }


  userData();

}, []);

if (loading) return <div>Loading...</div>;
if(!user) return <div>User is not Found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <UserProfileContent
       user={user}
      />
    </div>
  );
}
