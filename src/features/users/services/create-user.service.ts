import api from "@/src/lib/axios";
import { CreateUserRequest, CreateUserResponse } from "../types";

export const createUserService = async ( data: CreateUserRequest): Promise<CreateUserResponse> => {
    const response = await api.post<CreateUserResponse>("/users/add", data);
    return response as unknown as CreateUserResponse;
};
