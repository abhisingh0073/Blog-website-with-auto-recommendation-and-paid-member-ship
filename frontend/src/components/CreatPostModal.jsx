import { faEye, faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Editor from "./Editor";
import { createPost } from "../api/postApi";
import { useToast } from "../context/ToastContext";
import ButtonSpinner from "./ui/ButtonSpinner";


export default function CreatePostModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const[loading, setLoading] = useState(false);

    const toast = useToast();

    const imageRef = useRef(null);
    const [coverImage, setCoverImage] = useState();
    const [coverFile, setCoverFile] = useState(null);

    const [form, setForm] = useState({
      title: "",
      content: "",
      tags: "",
      status: "public",
      category: "Select",
      excerpt: "",
      isMembersOnly: false,
    })

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


    const handleSubmit = async(e)=>{
      e.preventDefault();

      if(!form.title || !form.content){
        alert("Title and content are required");
        return;
      }

      setLoading(true);

      try{

        const formData = new FormData();

          formData.append("postTitle", form.title);
          formData.append("postContent", form.content);
          formData.append("tags", form.tags);
          formData.append("category", form.category);
          formData.append("status", form.status);
          formData.append("excerpt", form.excerpt);
          formData.append("isMembersOnly", form.isMembersOnly); 
          
          if(coverFile){
            formData.append("coverImage", coverFile);
          }

        const res = await createPost(formData);

        toast.success(res.data.message);
        setLoading(false);
        onClose();

      } catch(error){
        toast.error(error.response.data.message || "Something went wrong")
        setLoading(false);
      }
    }


    const handleChange = (e) => {
      setForm({...form , [e.target.name]:e.target.value});
    }


  return (
    <div className="fixed flex inset-0 z-50 w-full bg-[var(--bg-surface)]">

      <form action="" onSubmit={handleSubmit} encType="multipart/form-data"  className="flex w-full h-full">
        <div className="m-3 w-full flex flex-col items-center">
            <input type="text" 
              name="title"
              value={form.title}
              placeholder="Title"
              onChange={handleChange}
              className="w-full p-2 pb-1 text-xl outline-none border border-[var(--border-color)] bg-[var(--bg-surface)] placeholder-[var(--text-secondary)]" />
            <div className="mt-3 w-[60rem] flex-1 ">

                {/* Editor */}
                <div className="flex-1 h-screen rounded-lg">
                  <Editor
                   value={form.content}
                   onChange={(html) => setForm({...form, content: html})}
                  />  
                </div>
                 

           </div>

        </div>


        {/* section 2 */}
        <div className="w-[20%] bg-[var(--bg-surface)]">

            {/* preview and status */}
           <div className="flex gap-3 m-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-color)] border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors duration-200 font-medium text-slate-700 shadow-sm">
                <FontAwesomeIcon icon={faEye} className="text-[var(--text-secondary)]" />
                Preview
              </button>
  
              <select
                name="status"
                value={form.status}
                onChange={handleChange} 
                className="px-4 py-2 border border-[var(--border-color)] rounded-lg bg-[var(--bg-color)] text-[var(--text-primary)] font-medium outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 cursor-pointer shadow-sm hover:border-[var(--border-color)]"
              >
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
           </div>

           {/* set coverimage */}
           <div>
            <div className="flex flex-col border-t border-[var(--border-color)] py-2 gap-2 m-3">
               <h3>Set Cover Image</h3>
               <div className="relative w-full aspect-video rounded-lg bg-slate-200 border border-dashed border-[var(--border-color)] flex items-center justify-center overflow-hidden transition-all">
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
                     <label className="px-3 py-2 text-[15px] font-medium border border-indigo-600 text-[var(--text-primary)] rounded text-center cursor-pointer hover:border-indigo-700 hover:bg-[var(--hover-bg)] transition">Select Image
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
                    className=" px-3 py-2 border border-[var(--border-color)] text-[var(--[text-primary])] text-[15px] font-medium rounded cursor-pointer hover:bg-[var(--hover-bg)] transition">Remove Image
                    </label>

               </div>
               
            </div>

            {/* tags */}
            <div className="flex flex-col gap-2 m-3 pt-2 border-t border-[var(--border-color)]">
                <h3>Tags</h3>
                <textarea name="tags" id=""
                value={form.tags}
                onChange={handleChange}
                placeholder="Add comma(,) between tags"
                className="outline-none w-full h-[150px] border border-[var(--border-color)] resize-none p-1 rounded-lg"
                />
            </div>

            {/* category */}
            <div className="flex flex-col gap-2 m-3 pt-2 border-t border-[var(--border-color)]">
                <h3>Select Category</h3>
                <select name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border rounded-lg border-[var(--border-color)] bg-[var(--bg-surface)] p-1 outline-none">
                    <option value="">Select</option>
                    <option value="tech">Tech</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>

            <div className="flex flex-row gap-2 m-3 pt-2 border-t border-[var(--border-color)]">
              <label className="font-medium">For Membersonly</label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isMembersOnly"
                    checked={form.isMembersOnly === true}
                    onChange={() =>
                      setForm({ ...form, isMembersOnly: true })
                    }
                  />
                  Yes
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isMembersOnly"
                    checked={form.isMembersOnly === false}
                    onChange={() =>
                      setForm({ ...form, isMembersOnly: false })
                    }
                  />
                  No
                </label>
            </div>              

            
            {/* submit and cancel button */}
            <div className="flex gap-3 justify-end border-t border-[var(--border-color)] m-3 pt-3">
                <button 
                type="button"
                onClick={onClose}
                className="py-2 px-3 border border-[var(--border-color)] rounded-lg cursor-pointer font-medium hover:bg-[var(--hover-bg)]">Cancel</button>
                <button 
                type="submit"
                className={`py-2 px-3 border bg-indigo-600 rounded-lg text-[var(--text-primary)] cursor pointer hover:bg-indigo-700 font-medium${loading&& "cursor-not-allowed"} `}>{loading? (<ButtonSpinner/>) : "Submit"}</button>
            </div>
           </div>
        </div>

      </form>
        {/* section 1 */}

    </div>
  );
}
