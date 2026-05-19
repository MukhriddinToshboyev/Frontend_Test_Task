import axios from 'axios'
import Cookies from "js-cookie";

// 1. instance yaratamiz va unga asosiy sozlamalarni beramiz
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 2. Request interceptor — har bir so'rovga access token qo'shish
  api.interceptors.request.use((config) => {

    const token = Cookies.get(`accessToken`);

    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

// 3. Response interseptor - har bir sererdan kelgan javobni tutib olib uni nazorat qiladi va keyin uzatadi 
// agar togri bolsa data malumotlarini qaytaradi agar error bolsa login sahifasiga qaytaradi 

  api.interceptors.response.use(
    (response) => response.data,

    async (error) => {
      const originalRequest = error.config;

      if(error.response.status === 401 && !originalRequest._retry){
        // cheksiz loop ga tushib qolish oldini olish
        originalRequest._retry = true;

        try {
          const refreshToken = Cookies.get("refreshToken");

          if(!refreshToken){
            throw new Error("Refresh Token topilmadi!!!");
          }

          // refreshTokenni olish 
          const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
             {
            refreshToken: refreshToken,
            },
            {
              withCredentials: true,
            }
           );

          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;

          Cookies.set("accessToken", newAccessToken,{
            expires: 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          })

          Cookies.set("refreshToken", newRefreshToken,{
            expires: 30,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          })

          // headerni yangilash 
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return api(originalRequest)

        } catch (refreshError) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  )

  export default api;

