import { useEffect, useState } from "react";
import CreatorProfileContent from "../components/Profile/creatorProfile/CreatorProfileContent";
import { creatorDataApi } from "../api/creatorProfile";
import { useParams } from "react-router-dom";

export default function CreatorProfile(){
    const { creatorId } = useParams();

    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const creatorData = async () => {
            try{
                const res =await creatorDataApi(creatorId);
                setCreator(res.data.creator);
        
            } catch(error){
                console.log(error);
            } finally{
                setLoading(false);
            }
        }

        creatorData();
    }, [creatorId]);

    if (loading) return <p>Loading...</p>;
    if (!creator) return <p>Creator not found</p>;



    return(
        <div className="max-w-6xl mx-auto">
            <CreatorProfileContent 
                creator= {creator}
            />
        </div>
    )
}