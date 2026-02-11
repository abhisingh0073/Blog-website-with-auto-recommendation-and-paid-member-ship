import api from "./api";


export const notificationApi = () => api.get("/notification", {withCredentials: true});
