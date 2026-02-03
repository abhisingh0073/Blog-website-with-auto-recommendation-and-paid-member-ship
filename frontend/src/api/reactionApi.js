import api from "./api";

export const followApi = (authorId) => api.post(`/user/${authorId}`,
     { withCredentials: true,});

export const likeApi = (postId, reaction) => {
    return api.post(`/reaction/${postId}`, {reaction},
    { withCredentials: true});
}


export const readLaterApi = (postId) => api.post(`/read-later/${postId}`,
    {withCredentials: true});


export const isSavedApi = (postId) => api.get(`/read-later/${postId}`, {withCredentials: true});