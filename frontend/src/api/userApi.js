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



export const subscribeCreator = async (creatorId) => {
  // 1. Create order
  const { data } = await api.post("/membership/create-order", { creatorId }, {withCredentials: true});

  const options = {
    key: "rzp_test_SC2oU3cjCJRiWn", // your key id
    amount: data.order.amount,
    currency: "INR",
    name: "MindPost",
    description: "Creator Membership",
    order_id: data.order.id,
    handler: async function (response) {
      // 2. Verify payment
      await api.post("/membership/verify", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        creatorId,
      }, {withCredentials: true});

      alert("Membership Activated 🎉");
    },
    theme: { color: "#6366f1" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
  