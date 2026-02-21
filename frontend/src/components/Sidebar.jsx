import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBookmark,
  faUserPlus,
  faClock,
  faThumbsUp,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



export default function Sidebar() {

  

  const tabs = [
    { label: "Home", icon: faHouse, to:"/" },
    { label: "Saved", icon: faBookmark, to:"/saved" },
    { label: "History", icon: faClock, to: "/history" },
    { label: "Liked Posts", icon: faThumbsUp, to: "/liked" },
    { label: "My Posts", icon: faFileLines, to: "/my-posts" },
    { label: "Following", icon: faUser, to:"/following" },
  ];

  const [activeTab, setActiveTab] = useState("Home");

  return (
    <aside className="w-60 border-r h-full py-4 px-2 bg-[var(--bg-surface)]">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <SidebarItem
           key={tab.label}
           icon= {tab.icon}
           label = {tab.label}
           to={tab.to}
          />
        ))}

      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink 
      to={to}
      className={({isActive}) => `flex items-center text-[15px] gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
        ${isActive ? "bg-indigo-600 text-[var(--text-primary)] shadow-md shadow-[var(--shadow)]" : "text-slate-600 hover:bg-[var(--hover-bg)] hover:text-[var(--text-secondary)]"}
        `}>


      {({ isActive }) => (
        <>
          <FontAwesomeIcon
            icon={icon}
            className={`w-5 ${
              isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] opacity-80"
            }`}
          />
          <span className="font-semibold">{label}</span>
        </>
      )}
    </NavLink>
  );
}
