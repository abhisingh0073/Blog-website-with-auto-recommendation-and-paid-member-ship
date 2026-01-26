import { faEye, faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Editor from "./Editor";


export default function CreatePostModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const imageRef = useRef(null);
    const [coverImage, setCoverImage] = useState();
    const [content, setContent] = useState("");

    const handleSelect = (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const previewUrl = URL.createObjectURL(file);
        setCoverImage(previewUrl)
    }

    const handleRemove = () => {
        setCoverImage();
        imageRef.current.value = "";
    }


  return (
    <div className="fixed flex inset-0 z-50 w-full bg-slate-100">

        {/* section 1 */}
        <div className="m-3 w-full flex flex-col items-center">
            <input type="text" 
              placeholder="Title"
              className="w-full p-2 pb-1 text-xl outline-none border border-gray-300 bg-white placeholder-gray-200" />
            <div className="mt-3 w-[60rem] flex-1 ">

                {/* Editor */}
                <div className="flex-1 h-screen rounded-lg">
                  <Editor/>  
                </div>
                 

           </div>

        </div>


        {/* section 2 */}
        <div className="w-[20%] bg-white">

            {/* preview and status */}
           <div className="flex gap-3 m-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors duration-200 font-medium text-slate-700 shadow-sm">
                <FontAwesomeIcon icon={faEye} className="text-slate-600" />
                Preview
              </button>
  
              <select 
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
                <textarea name="" id=""
                placeholder="Add comma(,) between tags"
                className="outline-none w-full h-[150px] border border-slate-300 resize-none p-1 rounded-lg"
                />
            </div>

            {/* category */}
            <div className="flex flex-col gap-2 m-3 pt-2 border-t border-slate-300">
                <h3>Select Category</h3>
                <select name="" id="" className="border rounded-lg border-slate-400 p-1 outline-none">
                    <option value="">Select</option>
                    <option value="">Hiiiiiiii</option>
                    <option value="">Hiiiiiiii</option>
                    <option value="">Hiiiiiiii</option>
                    <option value="">Hiiiiiiii</option>
                    <option value="">Hiiiiiiii</option>
                    <option value="">Hiiiiiiii</option>
                    <option value="">Hiiiiiiii</option>
                </select>
            </div>
            
            {/* submit and cancel button */}
            <div className="flex gap-3 justify-end border-t border-slate-300 m-3 pt-3">
                <button 
                onClick={onClose}
                className="py-2 px-3 border border-slate-300 rounded-lg cursor-pointer font-medium hover:bg-slate-300">Cancel</button>
                <button className="py-2 px-3 border bg-indigo-600 rounded-lg text-white cursor pointer hover:bg-indigo-700 font-medium">Submit</button>
            </div>
           </div>
        </div>
    </div>
  );
}
