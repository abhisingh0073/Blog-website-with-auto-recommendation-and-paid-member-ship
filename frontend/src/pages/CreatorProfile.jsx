import { useEffect, useState } from "react";
import CreatorProfileContent from "../components/Profile/creatorProfile/CreatorProfileContent";
import { creatorDataApi } from "../api/creatorProfile";

export default function CreatorProfile(){
    const { userId } = useParams();

    const [creator, setCreator] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const creatorData = async () => {
            try{
                const res = await creatorDataApi(userId);
                setCreator(res.data.creator);
                setPost(res.data.post);

            } catch(error){

            }
        }

        creatorData();
    }, [userId])
    const {user, profile} = creatorProfile()
    return(
        <div className="max-w-6xl mx-auto">
            <CreatorProfileContent/>
        </div>
    )
}