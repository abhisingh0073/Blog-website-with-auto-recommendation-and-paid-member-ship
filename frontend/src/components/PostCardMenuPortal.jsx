import { createPortal } from "react-dom";
import PostCardMenu from "./PostCardMenu";

export default function PostCardMenuPortal({ position }) {
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
      <PostCardMenu />
    </div>,
    document.body
  );
}
