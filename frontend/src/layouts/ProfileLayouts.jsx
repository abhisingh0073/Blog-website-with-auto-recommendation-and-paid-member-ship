import Navbar from "../components/Navbar";
import ProfileContent from "../components/Profile/ProfileContent";
import Sidebar from "../components/Sidebar";

export default function ProfileLayouts(){
    return(
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
            
                    
                    <main className="flex-1 overflow-y-auto px-4 bg-gray-50">
                      <div className="">
                        <ProfileContent/>
                      </div>
                    </main>
            </div>
        </div>
    )
}