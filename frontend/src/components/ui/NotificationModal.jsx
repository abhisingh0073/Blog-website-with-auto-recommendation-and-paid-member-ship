import { formatRelativeTime } from "../../utils/formatRelativeTime";

export default function NotificationModal({ notifications = [], isOpen, onClose }) {
  if (!isOpen) return null;

  const apiUrl = "http://localhost:3456";

  return (
    <div
      className="fixed inset-0 z-40"
      onClick={onClose} // click outside closes
    >
      <div
        className="absolute right-4 top-14 w-80 bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto z-50"
        onClick={(e) => e.stopPropagation()} // click inside doesn't close
      >
        {notifications.length === 0 && (
          <p className="p-4 text-gray-500">No Notifications</p>
        )}

        {notifications.map((n) => {
          if (n.type === "follow") {
            return (
              <div
                key={n._id}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-400/20"
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
