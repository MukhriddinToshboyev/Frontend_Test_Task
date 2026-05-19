

import { useMutation } from "@tanstack/react-query";
import {useAuthStore} from "../store/auth.store"
import { LoginRequest } from "../types";
import { loginService } from "../services";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export const useLogin = () =>{
    
    const {setUser, setAccessToken, setError, setIsLoading } = useAuthStore();

    const router = useRouter();


    // mutation ni yaratamiz 
    const {mutate: login, isPending, isError, error} = useMutation({

        // Sorov boshlangan paytda loading holatini yoqamiz
        onMutate: ()=>{
            setIsLoading(true);
            setError("");
        },
        // qaysi funksiyani chaqirish kerakligini aytadi 
        mutationFn: (data: LoginRequest) =>{
        console.log("1. mutationFn ishladi:", data); 
        return loginService(data)
        },

        // request jonatganimizdan keyin bizga response kelgan bolsa uni storega yozamiz 
        onSuccess: (response) =>{
            console.log("2. onSuccess ishladi:", response);
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

            // cookie ga  accessTokenni saqlash 
           Cookies.set("accessToken", response.accessToken, {
                expires: 7, // 7 kun davomida saqlanadi,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "strict", // Faqat oz saytingizda yuborilda ishalydi 
                path: '/' // loyihaning barcha sahifalarida ishlaydi 
           })
           
           Cookies.set("refreshToken", response.refreshToken, {
                expires: 30, // 30 kun davomida saqlanadi,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "strict",
                path: '/' 
           })

            router.push(`/dashboard`);
        },

        // agar error bolsa 
        onError: (error) =>{
            console.log(" Login qilishda xatolik yuz berdi", error);
        }
    })
    return {login, isPending, isError, error};
}