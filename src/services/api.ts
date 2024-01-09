import axios from "axios";
const api = axios.create({
  baseURL: "http://172.18.9.170:3000"
});

export const chatService = async (message:string) => {
  return await api.post("/chat", {message});
};
export default api;
