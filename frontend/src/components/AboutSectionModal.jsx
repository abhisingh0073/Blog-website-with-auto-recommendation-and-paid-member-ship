export default function AboutSectionModal({isOpen, onClose, user}){

    if(!isOpen) return null;

      const date = new Date(user.createdAt);
      const dateString = date.toLocaleDateString("en-US", {
       year: "numeric",
       month: "short",
       day: "numeric",
     });

     console.log(user);



return(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-[var(--bg-color)]/70"
      onClick={onClose}
    />

   
    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
                    rounded-xl bg-neutral-900 text-[var(--text-color)] p-6 z-10">

   
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <button
          onClick={onClose}
          className="text-[var(--text-secondary)]/70 hover:text-[var(--text-primary)] text-2xl cursor-pointer transition"
        >
          ✕
        </button>
      </div>

    
      <h3 className="text-lg font-medium mb-2">Description</h3>
      <p className="text-sm text-[var(--text-primary)]/80 leading-relaxed mb-4">
        {user.bio}
      </p>

      
      <h3 className="text-lg font-medium mb-3">Links</h3>
      <ul className="space-y-3 text-sm">
        {user.socials?.length > 0 ? (
           user.socials.map((social, index) => (
          <li key={index}>
            <a
              href={social.url.startsWith("http") ? social.url : `https://${social.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {social.platform}
            </a>
          </li>
        ))
      ) : (
  <p className="text-[var(--text-secondary)]/50">No social links added</p>
)}

      </ul>

      
      <div className="mt-6 space-y-2 text-sm text-[var(--text-primary)]/70">
        <p>🌍 United States</p>
        <p>📅 Joined {dateString}</p>
        <p>👥 {user.follower} subscribers</p>
        <p>🎬 {user.postCount} posts</p>
      </div>
    </div>
  </div>
)
    
  
}