import api from "@/src/lib/axios";
import { LoginRequest, LoginResponse } from "../types"; 

export const loginService = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login",
    {
      username: data.username,
      password: data.password,
      expiresInMins: 24 * 60, // accessToken muddatini belgilash
    });
    return response as unknown as LoginResponse;
};
