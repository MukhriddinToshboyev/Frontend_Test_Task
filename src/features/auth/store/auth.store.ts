import { create } from "zustand";
import { User } from "../types/login.types";
import { persist } from "zustand/middleware";


interface AuthState {

  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // funksiyalar
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  logout: ()=> void;
}

 export const useAuthStore = create<AuthState>()(
    persist(
    (set) =>({

    // boshlangich qiymat 
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      

      //user malumotlari 
      setUser: (user) => set({user}),

      //tokenni saqlash 
      setAccessToken: (token) => 
        set({
           token: token,
           isAuthenticated: true,
        }),

      setIsLoading: (isLoading) => set({isLoading}),

      setError: (error) => set({error}),

      logout: () =>
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        }),
}),

   {
     name: `auth store`,
    }
)
);
