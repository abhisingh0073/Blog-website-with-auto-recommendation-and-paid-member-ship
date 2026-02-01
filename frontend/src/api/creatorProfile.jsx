import api from "./api";

export const creatorDataApi = (creatorId) => api.get(`/creatorData/${creatorId}`, {withCredentials: true});