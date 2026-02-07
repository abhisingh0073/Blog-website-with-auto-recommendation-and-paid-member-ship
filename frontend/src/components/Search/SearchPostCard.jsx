export default function SearchPostCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-out hover:-translate-y-1 rounded-xl pb-4 pt-4 relative border cursor-pointer">
      <div>
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
          alt="Profile of Abhishek Kumar Singh"
          className="w-48 h-48 rounded-full object-cover object-center"
        />
      </div>

      <h1 className="font-bold">Abhishek Kumar Singh</h1>
      <h2 className="text-slate-400 font-bold">100k Followers</h2>

      <button className="w-[10rem] bg-indigo-600 rounded-lg px-3 py-2 hover:bg-indigo-500">
        <span className="text-white font-bold">Follow</span>
      </button>
    </div>
  );
}
