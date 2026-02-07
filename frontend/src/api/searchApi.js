import api from "./api";



export const searchPostsApi = (query) => {
  return api.get(`/search?q=${encodeURIComponent(query)}`);
};

export const suggestionsApi = (query) => {
    return api.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
}
