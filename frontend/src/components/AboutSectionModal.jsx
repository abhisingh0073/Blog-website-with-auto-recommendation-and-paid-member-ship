export default function AboutSectionModal({isOpen, onClose, user}){

    if(!isOpen) return null;

      const date = new Date(user.createdAt);
      const dateString = date.toLocaleDateString("en-US", {
       year: "numeric",
       month: "short",
       day: "numeric",
     });



return(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-black/70"
      onClick={onClose}
    />

   
    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
                    rounded-xl bg-neutral-900 text-white p-6 z-10">

   
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white text-2xl cursor-pointer"
        >
          ✕
        </button>
      </div>

    
      <h3 className="text-lg font-medium mb-2">Description</h3>
      <p className="text-sm text-white/80 leading-relaxed mb-4">
        {user.bio}
      </p>

      
      <h3 className="text-lg font-medium mb-3">Links</h3>
      <ul className="space-y-3 text-sm">
        {user.socials.map((social) => 
        <li>
          <a href= {`${social.url}`} target="_blank" className="text-blue-400 hover:underline">
            {socialplatform}
          </a>
        </li>)}
      </ul>

      
      <div className="mt-6 space-y-2 text-sm text-white/70">
        <p>🌍 United States</p>
        <p>📅 Joined {dateString}</p>
        <p>👥 {user.follower} subscribers</p>
        <p>🎬 {user.postCount} posts</p>
      </div>
    </div>
  </div>
)
    
  
}