import { useEffect, useState } from "react";
import api from "./api";


// export default function useUserProfileApi(){
//     // const [posts, setPosts] = useState([]);
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null)

//     useEffect(() => {
//            api.get("/user/profile").then((res) => {
//         //    setPosts(res.data.posts);
//            setUserData(res.data.user);
//         })
//         .catch((err) => {
//             setError(err.response?.data?.message || "Failed to load try again")
//         }) 
//         .finally(() => {setLoading(false)});
//     }, []);

//     return { userData, loading, error}
// }

export const userProfileApi = () => api.get("/user/profile", {withCredentials: true});


export const updateProfile = (data) => {
    return api.put("/user/profile", data, {
        withCredentials: true,
    });
}


export const fetchUserPosts = async () => {
    const fetchedData = await api.get("/user/post", {withCredentials: true});

    return fetchedData;
}