"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserService } from "../services";
import { CreateUserRequest, IUsersResponse } from "../types";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: CreateUserRequest) => createUserService(data),
        onSuccess: (createdUser) => {
            queryClient.setQueryData<IUsersResponse>(["users"], (current) => {
                if (!current) return current;

                return {
                    ...current,
                    total: current.total + 1,
                    users: [
                        {
                            id: createdUser.id,
                            firstName: createdUser.firstName,
                            lastName: createdUser.lastName,
                            age: createdUser.age,
                            gender: "unknown",
                            email: createdUser.email || "",
                            phone: createdUser.phone || "",
                            username: createdUser.username || createdUser.firstName.toLowerCase(),
                            image: "https://dummyjson.com/icon/user/128",
                            role: "user",
                            address: {
                                address: "",
                                city: "",
                                state: "",
                                country: "",
                            },
                            company: {
                                name: "",
                                title: "",
                                department: "",
                            },
                        },
                        ...current.users,
                    ],
                };
            });
        },
    });

    return {
        createUser: mutation.mutate,
        isCreating: mutation.isPending,
        isCreateError: mutation.isError,
        createError: mutation.error,
    };
};
