import api from "./api"


export const getCommentApi = (postId) => {
    return api.get(`/comment/${postId}`, {withCredentials: true});
}


export const postCommentApi = (postId, currentComment) => {
    return api.post(`/comment`, {postId, currentComment}, {withCredentials: true});
}

export const deleteComment = (commentId) => {
    return api.delete(`/comment/${commentId}`, {withCredentials: true});
}



export const commentLikeApi = (postId) => {
    return api.post(`/comment/like/${postId}`,{ withCredentials: true});
}