import { useEffect, useState } from "react"
import api from "./api"


export const createPost = (data) => {
    return api.post("/post", data, {
        withCredentials: true,
    });
}



export default function recommendationPost(){
    const[posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        api.get("/recommendations").then((res) => {
            setPosts(res.data);
        })
        .catch((err) => {
            setError(err.response.data || "Failed to load try again")
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {posts, loading, error}

}


