import api from "@/src/lib/axios";
import { LoginRequest, LoginResponse } from "../types"; // Agar LoginResponse shart bo'lmasa olib tashlang

export const loginService = async (data: LoginRequest): Promise<LoginResponse> => {
    // 1. api.get ni api.post ga o'zgartirdik
    // 2. Axios qaytaradigan ma'lumot aynan LoginData tipida ekanligini ko'rsatdik
    const response = await api.post<LoginResponse>("/auth/login",
    {
      username: data.username,
      password: data.password,
      expiresInMins: 1, // Access Token faqat 1 daqiqa (60 soniya) yashaydi
    });
    return response as unknown as LoginResponse;
};
