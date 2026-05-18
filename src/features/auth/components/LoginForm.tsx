"use client";

import z from "zod";
import { useLogin } from "../hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username majburiy" })
    .min(3, { message: "Username 3 ta belgidan kam bo'lmasligi kerak" }),
  password: z
    .string()
    .min(1, { message: "Parol majburiy" })
    .min(8, { message: "Parol 8 ta belgidan kam bo'lmasligi kerak" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isPending } = useLogin();
  // const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="fixed  flex inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
        <div className="w-full h-[300px] max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/25 overflow-hidden">
        
        <div className="px-10 pt-10 pb-8 text-center border-b border-white/15">

          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Xush kelibsiz
          </h1>
          <p className="text-blue-100 text-base">
            Tizimga kirish uchun malumotlarni kiriting
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-10 py-8 space-y-5">
          
          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="example@mail.com"
              autoComplete="username"
              className={`
                w-full px-4 py-3.5 rounded-xl text-white placeholder-white/40
                bg-white/15 border outline-none
                transition-all duration-200
                ${errors.username
                  ? "border-red-400/70 bg-red-400/10 focus:border-red-400"
                  : "border-white/25 focus:border-white/60 focus:bg-white/20"
                }
              `}
            />
            {errors.username && (
              <p className="text-red-300 text-xs font-medium flex items-center gap-1.5">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90">
              Parol
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type= "text"
                placeholder="••••••••"
                autoComplete="current-password"
                className={`
                  w-full px-4 py-3.5 pr-12 rounded-xl text-white placeholder-white/40
                  bg-white/15 border outline-none
                  transition-all duration-200
                  ${errors.password
                    ? "border-red-400/70 bg-red-400/10 focus:border-red-400"
                    : "border-white/25 focus:border-white/60 focus:bg-white/20"
                  }
                `}
              />
              emilyspass
            </div>
            {errors.password && (
              <p className="text-red-300 text-xs font-medium flex items-center gap-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="
                w-full py-3.5 px-4 rounded-xl font-bold text-purple-700
                bg-white hover:bg-blue-50 active:scale-[0.98]
                shadow-lg shadow-black/20
                transition-all duration-200
                disabled:bg-white/50 disabled:text-white/60 disabled:cursor-not-allowed disabled:shadow-none
                flex items-center justify-center gap-2
              "
            >
              {isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  Kirish...
                </>
              ) : (
                "Kirish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};