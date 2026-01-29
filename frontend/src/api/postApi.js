import api from "./api"


export const createPost = (data) => {
    return api.post("/post", data)
}