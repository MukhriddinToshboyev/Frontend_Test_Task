"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersService } from "../services";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsersService,
    });
};