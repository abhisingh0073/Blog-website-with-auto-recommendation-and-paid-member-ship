import api from "./api";

export const creatorDataApi = (creatorId) => api.get(`/profile/creator/${creatorId}`, {withCredentials: true});
export const creatorPostApi = (creatorId) => api.get(`/profile/creator-post/${creatorId}`);