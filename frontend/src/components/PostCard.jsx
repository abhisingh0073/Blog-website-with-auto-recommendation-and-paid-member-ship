import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostCard() {
  return (
    <div className="
      max-w-sm 
      flex flex-col gap-3 
      cursor-pointer 
      rounded-2xl 
      pb-3
      bg-white 
      transition-all duration-300 
       hover:bg-slate-50 
      hover:ring-4
      hover:ring-slate-50 
      hover:shadow-lg
      hover:-translate-y-1
    ">
      {/* 1. Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ40IqZ50wgWknYL8oI3-qPNjOrM5cEWNR1gw&s"
          alt="Thumbnail"
          className="w-full h-full object-cover group-hover:rounded-none transition-all duration-200"
        />
        {/* Optional: Duration badge */}
        {/* <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          12:45
        </span> */}
      </div>

      {/* 2. Content Section */}
      <div className="flex gap-3 px-1">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
            alt="Channel"
            className="w-9 h-9 rounded-full"
          />
        </div>

        {/* Video Info */}
        <div className="flex flex-col flex-1 pr-4 relative">
          <h3 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2 mb-1">
            This is testing the creation of a post that might wrap to two lines
          </h3>
          
          <div className="text-[13px] text-slate-600 flex flex-col">
            <p className="hover:text-slate-900 transition-colors">Creator Name</p>
            <div className="flex items-center">
              <span>100 views</span>
              <span className="mx-1.5 text-[8px]">•</span>
              <span>2 hours ago</span>
            </div>
          </div>

          {/* 3. Options Menu (Positioned Top-Right of Text) */}
          <button className="absolute -right-1 top-0 p-1 text-slate-600 hover:bg-slate-100 rounded-full transition ">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </div>
    </div>
  );
}