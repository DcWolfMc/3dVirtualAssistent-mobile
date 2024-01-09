import axios from "axios";
const api = axios.create({
  baseURL: "http://172.18.9.170:3000"
});
console.log("process.env.REACT_APP_API_URL ",process.env.REACT_APP_API_URL );

export const chatService = async (data:string) => {
  return await api.post("/chat", data);
};
export default api;
