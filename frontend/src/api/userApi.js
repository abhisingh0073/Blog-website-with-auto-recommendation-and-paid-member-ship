import { useEffect, useState } from "react";
import api from "./api";



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






export const subscribeCreator = (creatorId, month) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      const { data } = await api.post(
        "/membership/create-order",
        { creatorId, month },
        { withCredentials: true }
      );

      const options = {
        key: "rzp_test_SC2oU3cjCJRiWn",
        amount: data.order.amount,
        currency: "INR",
        name: "MindPost",
        description: "Creator Membership",
        order_id: data.order.id,

        handler: async function (response) {
          try {
          
            const res = await api.post(
              "/membership/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                creatorId,
                month,
              },
              { withCredentials: true }
            );

            resolve(res); 
          } catch (err) {
            reject(err);
          }
        },

        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled"));
          },
        },

        theme: { color: "#6366f1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      reject(err);
    }
  });
};

  