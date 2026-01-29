import api from "./api.js";

export const signup = (data) => api.post("/user/signup", data);
export const login = (data) => api.post("/user/login", data);
export const logout = () => api.get("user/logout") ;
