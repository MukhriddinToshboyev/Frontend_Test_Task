import api from "@/src/lib/axios";
import { IUsersResponse } from "../types";

export const getUsersService = async (): Promise<IUsersResponse> => {
    const response = await api.get<IUsersResponse>("/users");
    return response as unknown as IUsersResponse;
};