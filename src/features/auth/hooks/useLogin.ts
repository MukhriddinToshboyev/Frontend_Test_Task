import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { LoginRequest } from "../types";
import { loginService } from "../services";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogin = () => {
    const { setUser, setAccessToken, setError, setIsLoading } = useAuthStore();
    const router = useRouter();

    const { mutate: login, isPending, isError, error } = useMutation({
        onMutate: () => {
            setIsLoading(true);
            setError("");
        },
        mutationFn: (data: LoginRequest) => loginService(data),
        onSuccess: (response) => {
            const userData = {
                id: response.id,
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                image: response.image,
                gender: response.gender,
            };

            setUser(userData);
            setAccessToken(response.accessToken);
            setError("");
            setIsLoading(false);

            Cookies.set("accessToken", response.accessToken, {
                expires: 7,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            Cookies.set("refreshToken", response.refreshToken, {
                expires: 30,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            router.push("/dashboard");
        },
        onError: () => {
            setIsLoading(false);
            setError("Login qilishda xatolik yuz berdi");
        },
    });

    return { login, isPending, isError, error };
};
