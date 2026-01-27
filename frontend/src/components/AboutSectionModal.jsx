export default function AboutSectionModal({isOpen, onClose}){

    if(!isOpen) return null;

return(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
   
    <div
      className="absolute inset-0 bg-black/70"
      onClick={onClose}
    />

   
    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
                    rounded-xl bg-neutral-900 text-white p-6 z-10">

   
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Netflix K-Content</h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white text-2xl cursor-pointer"
        >
          ✕
        </button>
      </div>

    
      <h3 className="text-lg font-medium mb-2">Description</h3>
      <p className="text-sm text-white/80 leading-relaxed mb-4">
        Netflix K-Content is the channel that takes you deeper into all types
        of Netflix Korean Content you LOVE. Whether you’re in the mood for some
        fun with the stars, want to relive your favorite moments, need help
        deciding what to watch next based on your personal taste, or looking
        to connect with like-minded fans, you’re in the right place.
        <br /><br />
        All things NETFLIX K-CONTENT.
      </p>

      <p className="text-sm text-white/80 leading-relaxed mb-4">
        여러분이 사랑하는 넷플릭스 한국 콘텐츠의 모든 것!
        Netflix K-Content에 모두 모였습니다.
      </p>

      
      <h3 className="text-lg font-medium mb-3">Links</h3>
      <ul className="space-y-3 text-sm">
        <li>
          <a href="https://netflix.com" target="_blank" className="text-blue-400 hover:underline">
            Netflix
          </a>
        </li>
        <li>
          <a href="https://instagram.com/netflixkr" target="_blank" className="text-blue-400 hover:underline">
            Instagram
          </a>
        </li>
        <li>
          <a href="https://x.com/NetflixKR" target="_blank" className="text-blue-400 hover:underline">
            Twitter (X)
          </a>
        </li>
        <li>
          <a href="https://tiktok.com/@netflixkr" target="_blank" className="text-blue-400 hover:underline">
            TikTok
          </a>
        </li>
      </ul>

      
      <div className="mt-6 space-y-2 text-sm text-white/70">
        <p>🌍 United States</p>
        <p>📅 Joined 21 Feb 2019</p>
        <p>👥 6.23M subscribers</p>
        <p>🎬 4,534 videos</p>
      </div>
    </div>
  </div>
)
    
  
}