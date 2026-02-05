import { faEye, faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../../../context/ToastContext";
import Editor from "../../Editor";
import ButtonSpinner from "../../ui/ButtonSpinner";
import { fetchPostToUpdate, updatePostApi } from "../../../api/postApi";
import Tiptap from "../../Editor";





export default function EditPostModal({ isOpen, onClose, postId, onSave }) {
    if (!isOpen) return null;
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [post ,setPost ] = useState(null);

    
    const apiUrl = "http://localhost:3456";

    const imageRef = useRef(null);
    const [coverImage, setCoverImage] = useState(``);
    const [coverFile, setCoverFile] = useState(null);
    const [postData, setPostData] = useState({
      title: "",
      content: "",
      tags:  "",
      status: "public",
      category: "",
      excerpt: "",
      isMembersOnly: false,
    });

    const handleSelect = (e) => {
        const file = e.target.files[0];
        if(!file) return;

        setCoverFile(file);
        const previewUrl = URL.createObjectURL(file);
        setCoverImage(previewUrl)
    }

    const handleRemove = () => {
        setCoverImage();
        setCoverFile(null);
        imageRef.current.value = "";
    }


    const handleChange = (e) => {
      setPostData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }


  
    const handleSubmit = async(e) => {
      e.preventDefault();

      console.log(postData);

      if(!postData.title || !postData.content){
        alert("Title and content are required");
        return;
      }

      setLoading(true);


      try{
        const formData = new FormData();

        formData.append("postTitle", postData.title);
        formData.append("postContent", postData.content);
        formData.append("tags", postData.tags);
        formData.append("category", postData.category);
        formData.append("status", postData.status);
        formData.append("excerpt", postData.excerpt);
        formData.append("isMembersOnly", postData.isMembersOnly);

        if(coverFile instanceof File){
          formData.append("coverImage", coverFile);
        }

        const res = await updatePostApi(formData, postId) ;

        toast.success(res.data.message);
        setLoading(false);
        onClose();

      }catch (err) {
         toast.error(err.response?.data?.message || "Failed to update post");
      } finally {
          setLoading(false);
        }

    }

useEffect(() => {

  if(!postId || !isOpen) return;

  const loadPost = async () => {
    try{
      const res = await fetchPostToUpdate(postId);
      setPost(res.data.post);
    } catch(err){
      toast.error(err.response.data.message || "Failed to load post");
    }
  }

  loadPost();
}, [postId, isOpen]);


// useEffect(() => {
//   return () => {
//     if (coverImage?.startsWith("blob:")) {
//       URL.revokeObjectURL(coverImage);
//     }
//   };
// }, [coverImage]);



useEffect(() => {
  if(post){
    setPostData({
      title: post.title || "",
      content: post.content || "",
      tags: post.tags || "",
      status: post.status || "public",
      category: post.category || "",
      excerpt: post.excerpt || "",
      isMembersOnly: post.isMembersOnly,
    });

    if(post.coverImage){
      setCoverImage(`${apiUrl}${post.coverImage}`)
    }
  }
}, [post]);




  return (
    <div className="fixed flex inset-0 z-50 w-full bg-slate-100 text-black">

        {/* section 1 */}
        <div className="m-3 w-full flex flex-col items-center">
            <input type="text"
              name="title"
              value= {postData.title} 
              placeholder="Title"
              onChange={handleChange}
              className="w-full p-2 pb-1 text-xl outline-none border border-gray-300 bg-white placeholder-gray-200" />
            <div className="mt-3 w-[60rem] flex-1 ">

                {/* Editor */}
                <div className="flex-1 h-screen rounded-lg text-black">
                  {/* <Editor
                    value={postData.content}
                     onChange={(html) =>
                     setPostData((prev) =>( {...prev, content: html}))
                    }
                   /> */}

                   <Tiptap
  content={postData.content}
  onChange={(html) => setPostData(prev => ({ ...prev, content: html }))}
/>


                </div>
                 

           </div>

        </div>


        {/* section 2 */}
        <div className="w-[20%] bg-white">

            
           <div className="flex gap-3 m-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors duration-200 font-medium text-slate-700 shadow-sm">
                <FontAwesomeIcon icon={faEye} className="text-slate-600" />
                Preview
              </button>
  
              <select
                name="status"
                value={postData.status} 
                onChange={handleChange}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 font-medium outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 cursor-pointer shadow-sm hover:border-slate-400"
              >
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
           </div>

           {/* set coverimage */}
           <div>
            <div className="flex flex-col border-t border-slate-200 py-2 gap-2 m-3">
               <h3>Set Cover Image</h3>
               <div className="relative w-full aspect-video rounded-lg bg-slate-200 border border-dashed border-slate-400 flex items-center justify-center overflow-hidden transition-all">
                   {coverImage ? (
                    <img
                      src={coverImage}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    
                ):(
                    <FontAwesomeIcon icon={faImage} className="text-4xl text-slate-500"/>
                )}
               </div>
               
               <div className="flex gap-2 items-center justify-center">
                     <label className="px-3 py-2 text-[15px] font-medium border border-indigo-600 text-black rounded text-center cursor-pointer hover:border-indigo-700 hover:bg-slate-100 transition">Select Image
                     <input 
                            ref={imageRef}
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleSelect} />
                    </label>

                    <label
                    type="button" 
                    onClick={handleRemove}
                    className=" px-3 py-2 border border-slate-300 text-black text-[15px] font-medium rounded cursor-pointer hover:bg-slate-100 transition">Remove Image
                    </label>

               </div>
               
            </div>

            {/* tags */}
            <div className="flex flex-col gap-2 m-3 pt-2 border-t border-slate-300">
                <h3>Tags</h3>
                <textarea
                   name="tags"
                   value={postData.tags}
                   onChange={handleChange}
                   placeholder="Add comma(,) between tags"
                  className="outline-none w-full h-[150px] border border-slate-300 resize-none p-1 rounded-lg"
                />

            </div>

            {/* category */}
            <div className="flex flex-col gap-2 m-3 pt-2 border-t border-slate-300">
                <h3>Select Category</h3>
                <select name="category" 
                        value={postData.category} 
                        onChange={handleChange}
                        className="border rounded-lg border-slate-400 p-1 outline-none">
                    <option value="">Select</option>
                    <option value="tech">Tech</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>

            <div className="flex flex-row gap-2 m-3 pt-2 border-t border-slate-300">
              <label className="font-medium">For Membersonly</label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isMembersOnly"
                    // value={true}
                    checked={postData.isMembersOnly === true}
                    onChange={() =>
                      setPostData({ ...postData, isMembersOnly: true })
                    }
                  />
                  Yes
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isMembersOnly"
                    // value={false}
                    checked={postData.isMembersOnly === false}
                    onChange={() =>
                      setPostData({ ...postData, isMembersOnly: false })
                    }
                  />
                  No
                </label>
            </div>  
            
        
            <div className="flex gap-3 justify-end border-t border-slate-300 m-3 pt-3">
                <button 
                onClick={onClose}
                className="py-2 px-3 border border-slate-300 rounded-lg cursor-pointer font-medium hover:bg-slate-300">Cancel</button>
                <button 
                onClick={handleSubmit}
                disabled={loading}
                className="py-2 px-3 border bg-indigo-600 rounded-lg text-white cursor pointer hover:bg-indigo-700 font-medium">
                  {loading ? <ButtonSpinner/> : "Update"}
                </button>
            </div>
           </div>
        </div>
    </div>
  );
}
