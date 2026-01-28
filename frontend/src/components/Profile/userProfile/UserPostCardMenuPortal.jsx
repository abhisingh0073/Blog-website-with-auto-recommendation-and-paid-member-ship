import { createPortal } from "react-dom";
import UserPostCardMenu from "./UserPostCardMenu";

export default function UserPostCardMenuPortal({ position, onEdit }) {
  if (!position) return null;

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
      <UserPostCardMenu onEdit={onEdit} />
    </div>,
    document.body
  );
}
