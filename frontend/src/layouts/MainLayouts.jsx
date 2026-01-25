import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="
            grid grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-x-4 gap-y-8
          ">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
