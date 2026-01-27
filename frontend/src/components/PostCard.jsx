import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostCard({ post }) {
  
  const title = post?.title || "This is a sample video title that might wrap to two lines";
  const views = post?.views || "100K";
  const timestamp = post?.timestamp || "2 hours ago";

  return (
    <div className="flex flex-col gap-3 cursor-pointer group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm rounded-xl pb-5">
      
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ40IqZ50wgWknYL8oI3-qPNjOrM5cEWNR1gw&s"
          alt="Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* text */}
      <div className="flex gap-3 px-0.5">
        <div className="flex-shrink-0 pt-0.5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
            alt="Channel"
            className="w-9 h-9 rounded-full bg-slate-100"
          />
        </div>

        <div className="flex flex-col flex-1 pr-6 relative">
          <h3 className="text-lg font-semibold text-[#0f0f0f] leading-tight line-clamp-2 mb-1">
            {title}
          </h3>
          
          <div className="text-[14px] text-[#606060] flex flex-col leading-tight">
            <p className="hover:text-[#0f0f0f] transition-colors">Creator Name</p>
            <div className="flex items-center">
              <span>{views} views</span>
              <span className="mx-1">•</span>
              <span>{timestamp}</span>
            </div>
          </div>

          <button className="absolute -right-1 top-0 p-1.5 text-slate-900 opacity-0 group-hover:opacity-100 hover:bg-black/5 rounded-full transition">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </div>
    </div>
  );
}