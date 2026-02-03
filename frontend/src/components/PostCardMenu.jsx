import {
  faBookBookmark,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { readLaterApi } from "../api/reactionApi";
import { useToast } from "../context/ToastContext";

export default function PostCardMenu({ postId, isSaved, onSavedChange, onClose }) {
  const [saved, setSaved] = useState(isSaved);
  const toast = useToast();

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved])

  const handleReadLater = async () => {
    try {
      const res = await readLaterApi(postId);
      setSaved(!saved);
      onSavedChange(!saved);
      toast.success(res.data.message);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-52 bg-[#282828] text-white rounded-xl py-2 shadow-2xl">
      <ActionButton
        onClick={handleReadLater}
        active={saved}
        icon={saved ? faBookmark : faBookmark}
        label={saved ? "Saved" : "Save to Library"}
      />
    </div>
  );
}

const ActionButton = ({ onClick, active, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm
      ${active ? "text-amber-500" : "text-white hover:bg-white/10"}`}
  >
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </button>
);
