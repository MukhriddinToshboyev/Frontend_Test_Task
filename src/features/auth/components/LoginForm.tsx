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
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)] p-4">

      <div className="w-full max-w-sm bg-white border border-black font-mono">

        <div className="px-6 py-5 border-b border-black">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">
            Admin Dashboard
          </p>
          <h1 className="text-2xl font-black uppercase tracking-tight text-black">
            Tizimga Kirish
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5">
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="emilys"
              autoComplete="username"
              className={`
                w-full px-3 py-2 text-xs font-mono text-black bg-neutral-50
                border outline-none transition-all duration-200
                placeholder:text-neutral-300
                ${errors.username
                  ? "border-red-500"
                  : "border-neutral-200 focus:border-black"
                }
              `}
            />
            {errors.username && (
              <p className="text-red-500 text-[10px] font-bold uppercase">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500">
              Parol
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className={`
                w-full px-3 py-2 text-xs font-mono text-black bg-neutral-50
                border outline-none transition-all duration-200
                placeholder:text-neutral-300
                ${errors.password
                  ? "border-red-500"
                  : "border-neutral-200 focus:border-black"
                }
              `}
            />
            {errors.password && (
              <p className="text-red-500 text-[10px] font-bold uppercase">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="
              w-full py-2.5 bg-black text-white
              text-xs font-black uppercase tracking-widest
              hover:bg-neutral-800 active:scale-[0.99]
              transition-all duration-150
              disabled:bg-neutral-300 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Kirish...
              </>
            ) : (
              "Kirish →"
            )}
          </button>

        </form>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200">
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            © 2026
          </span>
        </div>
      </div>
    </div>
  );
};