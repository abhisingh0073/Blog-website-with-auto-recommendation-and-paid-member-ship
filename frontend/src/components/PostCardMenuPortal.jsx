import { createPortal } from "react-dom";
import PostCardMenu from "./PostCardMenu";
import { isSavedApi } from "../api/reactionApi";
import { useEffect, useState } from "react";

export default function PostCardMenuPortal({ position, postId, onClose }) {
  if (!position) return null;

  const [saved, setSaved] = useState(false);

   useEffect(() => {
    let mounted = true;

    const checkSaved = async () => {
      try {
        const res = await isSavedApi(postId);
        if (mounted) setSaved(res.data.isSaved);

      } catch (err) {
        console.error(err);
      }
    };

    checkSaved();
    return () => (mounted = false);
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
      <PostCardMenu postId={postId}
                    isSaved = {saved}
                    onSavedChange={setSaved}
                    onClose={onClose}
      />
    </div>,
    document.body
  );
}
