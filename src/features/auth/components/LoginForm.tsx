"use client";

import z from "zod";
import { useLogin } from "../hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-100 p-6">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div className="relative p-10 w-full max-w-lg bg-white border-2 border-black shadow-2xl">

        {/* Yuqori aksent chiziq */}
        <div className="h-1 w-full bg-black" />

        {/* Header */}
        <div className="px-14 pt-12 pb-10 border-b-2 border-black">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2.5 h-2.5 bg-black rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-400">
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tight text-black leading-none">
            Tizimga<br />Kirish
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-14 py-12 space-y-10">

          {/* Username */}
          <div className="space-y-2">
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="emilys"
              autoComplete="username"
              className={`
                w-full px-0 py-3 text-base font-mono text-black bg-transparent
                border-b-2 outline-none transition-all duration-200
                placeholder:text-neutral-300
                ${errors.username
                  ? "border-red-500"
                  : "border-neutral-300 focus:border-black"
                }
              `}
            />
            {errors.username && (
              <p className="text-red-500 text-[11px] font-bold uppercase tracking-wide mt-1">
                — {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">
              Parol
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className={`
                w-full px-0 py-3 text-base font-mono text-black bg-transparent
                border-b-2 outline-none transition-all duration-200
                placeholder:text-neutral-300
                ${errors.password
                  ? "border-red-500"
                  : "border-neutral-300 focus:border-black"
                }
              `}
            />
            {errors.password && (
              <p className="text-red-500 text-[11px] font-bold uppercase tracking-wide mt-1">
                — {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="
                w-full py-5 bg-black text-white
                text-[13px] font-black uppercase tracking-[0.2em]
                hover:bg-neutral-800 active:scale-[0.99]
                transition-all duration-150
                disabled:bg-neutral-300 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Kirish...
                </>
              ) : (
                "Kirish →"
              )}
            </button>
          </div>

        </form>

        {/* Footer */}
        <div className="px-14 py-5 border-t-2 border-black flex items-center justify-between">
          <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-bold">
            © 2026
          </span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-black rounded-full" />
            <div className="w-2 h-2 bg-neutral-200 rounded-full" />
            <div className="w-2 h-2 bg-neutral-200 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
};