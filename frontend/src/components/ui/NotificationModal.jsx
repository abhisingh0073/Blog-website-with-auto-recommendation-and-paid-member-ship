import { formatRelativeTime } from "../../utils/formatRelativeTime";
import { useNavigate } from "react-router-dom";

export default function NotificationModal({ notifications = [], isOpen, onClose }) {
  if (!isOpen) return null;

  const apiUrl = "http://localhost:3456";
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 z-40"
      onClick={onClose}
    >
      <div
        className="absolute right-4 top-14 w-100 mr-[5%] bg-white shadow-2xl  rounded-lg max-h-96 overflow-y-auto z-50 no-scrollbar"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="p-3 text-black ">Notifications</h2>
        <div className="border-b border-slate-400"/>
        {notifications.length === 0 && (
          <p className="p-4 text-gray-500">No Notifications</p>
        )}

        {notifications.map((n) => {
          if (n.type === "follow") {
            return (
              <div
                key={n._id}
                className="flex items-center gap-5 p-3 cursor-pointer hover:bg-slate-400/20"
                onClick={() => {
                  navigate(n.link),
                  onClose()
                }}
              >
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={n.image ? `${apiUrl}${n.image}` : "https://cdn-icons-png.flaticon.com/512/709/709699.png"}
                  alt=""
                />
                <div>
                  <p className="text-sm">{n.message}</p>
                  <span className="text-sm text-gray-400">
                    {formatRelativeTime(n.createdAt)}
                  </span>
                </div>
              </div>
            );
          }

          if(n.type === "post"){
            return (
              <div
                key={n._id}
                className="flex items-center gap-5 p-3 cursor-pointer hover:bg-slate-400/20"
                onClick={() =>{ navigate(n.link), onClose()}}
              >
                <img
                  className="aspect-video max-w-[8rem] overflow-hidden rounded-xl"
                  src={n.image ? `${apiUrl}${n.image}` : "https://cdn-icons-png.flaticon.com/512/709/709699.png"}
                  alt=""
                />
                <div>
                  <p className="text-sm">{n.message}</p>
                  <span className="text-sm text-gray-400">
                    {formatRelativeTime(n.createdAt)}
                  </span>
                </div>
              </div>
            );            
          }

          // fallback for other notification types (optional)
          return (
            <div
              key={n._id}
              className={`p-3 border-b cursor-pointer ${
                n.isRead ? "bg-white" : "bg-indigo-50"
              }`}
            >
              <p className="text-sm">{n.message}</p>
              <span className="text-sm text-gray-400">
                {formatRelativeTime(n.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
