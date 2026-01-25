import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBookmark,
  faUserPlus,
  faClock,
  faThumbsUp,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";



export default function Sidebar() {
  return (
    <aside className="w-60 border-r h-full py-4 px-2 bg-white">
      <nav className="space-y-1">
        <SidebarItem icon={faHouse} label="Home" />
        <SidebarItem icon={faBookmark} label="Saved" />
        <SidebarItem icon={faUserPlus} label="Following" />
        <SidebarItem icon={faClock} label="History" />
        <SidebarItem icon={faThumbsUp} label="Liked Posts" />
        <SidebarItem icon={faFileLines} label="My Posts" />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center text-lg gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100">
      <FontAwesomeIcon icon={icon} className="text-slate-950" />
      <span className=" font-medium">{label}</span>
    </div>
  );
}
