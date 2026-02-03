import { createPortal } from "react-dom";
import UserPostCardMenu from "./UserPostCardMenu";
import { isSavedApi } from "../../../api/reactionApi";
import { useEffect, useState } from "react";

export default function UserPostCardMenuPortal({ position, onEdit, postId, onClose, onDelete, setOpenDeleteConfModal }) {
  if (!position) return null;

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSaved = async () => {
      try{
        const res = await isSavedApi(postId);
        if(mounted) setSaved(res.data.isSaved);
      } catch(err){
        console.log(err);
      }
    };

    checkSaved();
    return () => (mounted=false);
  }, [postId]);



  return createPortal(
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 1000,
        transform: "translateX(-100%)", // snug to button
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <UserPostCardMenu onEdit={onEdit}
                        postId={postId}
                        isSaved={saved}
                        onSavedChange={setSaved}
                        onClose={onClose}
                        onDelete={onDelete}
                        setOpenDeleteConfModal={setOpenDeleteConfModal}
      />
    </div>,
    document.body
  );
}
