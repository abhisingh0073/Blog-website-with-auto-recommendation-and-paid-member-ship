import { faCamera } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import AboutSectionModal from "../../AboutSectionModal";
import PostCard from "../../PostCard";
import EditProfileModal from "./EditAboutSectionModal";
import UserPostCard from "./UserPostCard";
import api from "../../../api/api";
import { updateProfile } from "../../../api/userApi";
import { useToast } from "../../../context/ToastContext";

export default function UserProfileContent({posts, userData}){

  const apiUrl = "http://localhost:3456";
  const toast = useToast();
  
  const fileRef = useRef(null);
  const profileRef = useRef(null);

  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [aboutOpen, setIsAboutOpen] = useState(false);
  const [editAboutOpen, setIsEditAboutOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
      setFollowers(userData.followers?.length || 0);
      setCoverImage(userData.coverImage ? `${apiUrl}${userData.coverImage}` : null);
      setProfileImage(userData.avatar ? `${apiUrl}${userData.avatar}` : null);
    }
  }, [userData]);




    const tabs = ["Posts", "Videos"];
    const [activeTab, setActiveTab] = useState("Posts");

//     if(!userData) {
//       return toast.error("first loggedin");
//     }
if (!currentUser) {
  return <div className="text-black p-6">Loading profile...</div>;
}


    const handleCoverImage = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("coverImage", file);
       
        try{
          const res = await updateProfile(formData);
          setCoverImage(`${apiUrl}${res.data.user.coverImage}`);
          setCurrentUser(res.data.user);
          toast.success("Cover image updated");
        } catch(err){
          toast.error(err.response.data.message);
        }
        
    }


    const handleProfileImage = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        try{
          const res = await updateProfile(formData) 
          setProfileImage(`${apiUrl}${res.data.user.avatar}`);
          console.log(profileImage);
        } catch(err){
          toast.error(err.response.data.message || "Avatar upload failed");
        }
        
    }


    const handleSaveProfile = (updatedUser) => {
      setCurrentUser(updatedUser);
      setIsEditAboutOpen(false);
    };



    return(<>
      <div className="min-h-screen max-w-6xl mx-auto bg-slate-900 text-white pb-20">
       <div className="max-w-6xl mx-auto px-4 pt-6">


         {/* cover imagr */}
        <div className="relative aspect-[6/1] w-full rounded-2xl overflow-hidden ">
            {coverImage ? (<img 
                          src={coverImage}
                          alt="Banner" 
                          className="w-full h-full object-cover"
                         />) : (<div className="flex w-full h-full bg-white/50 items-center justify-center">
                                  <FontAwesomeIcon icon={faCamera} size="xl"/>
                                  <h3 className="font-medium text-bold px-3">Cover Image</h3>
                            </div>)
        }
           <div className="absolute bottom-3 right-3 flex flex-row gap-2">
            {coverImage && (<button
               type="button"
               onClick={() => setCoverImage()}
               className="
                 flex items-center gap-2
                 rounded-3xl px-3 py-2
                 bg-red-500/30 text-white
                 hover:bg-red-500/50
                 transition cursor-pointer"
            >
               <span className="flex items-center text-sm font-medium">Remove</span>
               
            </button>)}

            <button
               type="button"
               onClick={() => fileRef.current.click()}
               className="
                
                 flex items-center gap-2
                 rounded-3xl px-3 py-2
                 bg-black/30 text-white
                 backdrop-blur-sm
                 hover:bg-black/40
                 transition cursor-pointer"
            >
               <FontAwesomeIcon icon={faCamera} />
               <span className="flex items-center text-sm font-medium">Edit</span>
               
            </button>
           </div>
           
             
            <input
                 ref={fileRef}
                 type="file"
                 accept="image/*"
                 onChange={handleCoverImage}
                 className="hidden"
               />
            
        </div>
        


        {/* profile image */}
        <div className="flex gap-6 mt-6  items-start md:items-center">
         <div className=" relative group h-40 w-40 rounded-full overflow-hidden border-4 border-[#0f0f0f]">
           
            <img
              src={profileImage}
              alt="Channel profile"
              className="w-full h-full bg-white object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {profileImage && (<button 
                              onClick={() => setProfileImage(null)}
                              className="p-2 bg-white/20 hover:bg-white/40 text-red-600 rounded-full hover:text-red-700 transition-colors"
                              title="Delete"
                              >
                              <FontAwesomeIcon icon={faTrash} size="lg" />
                              </button>)
              }
              
              <button
                type="button"
                onClick={() => profileRef.current.click()}
                className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-all"
                title="Change Photo"
              >
                <FontAwesomeIcon icon={faCamera} size="lg" />
              </button>
              <input 
              type="file"
              ref={profileRef} 
              accept="image/*"
              onChange={handleProfileImage}
              className="hidden"
              />
            </div>
        </div>
         

         <div className="flex flex-col gap-2 text-white">
           <h1 className="text-4xl font-bold">{currentUser.name}</h1>

          <p className="text-sm mt-3 font-medium text-slate-200">
            {followers.toLocaleString()} subscribers · 300 posts
          </p>

          <button 
          onClick={() => setIsAboutOpen(!aboutOpen)}
          className="text-sm text-slate-400 cursor-pointer hover:text-indigo-400 transition block text-left">
           <p>{currentUser.bio}...</p>
           <span>more</span>
         </button>
        
        <div className="flex gap-2 w-full md:w-auto">
         <button 
         onClick={() => setIsEditAboutOpen(true)}
         className="flex-1 md:flex-none px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-sm font-bold transition rounded-xl cursor-pointer">
            Customize
          </button>

        </div>
 
         </div>
        </div>


        {/* post section */}
        <div className="mt-12 border-b border-slate-700 flex gap-8 px-2">
           
                {tabs.map((tab) => (
                    <NavButton
                    key={tab}
                    label={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    />
                ))}
            
        </div>
       </div>

       <div className="mt-3">
          <div className="max-w-6xl mx-auto px-4 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
           <UserPostCard />
       </div>
       
  </div>
       

    
  </div>
    
    
    <AboutSectionModal
      isOpen={aboutOpen}
      onClose={() => setIsAboutOpen(false)}
    />

    <EditProfileModal
      isOpen={editAboutOpen}
      onClose={() => setIsEditAboutOpen(false)}
      initialData={currentUser}
      onSave={handleSaveProfile}
    />

    
    </>
    )



    
    
}
const NavButton = ({active, label, onClick}) => {
        return (
            <button 
            onClick={onClick}
            className={`px-4 pb-2 text-sm font-medium transition-colors
                ${active ? "border-b-2 border-slate-100 text-slate-100" : "text-slate-400 hover:text-slate-500 hover:border-b-2 hover:border-slate-500"}`}>
                    {label}
                </button>
        );
    }