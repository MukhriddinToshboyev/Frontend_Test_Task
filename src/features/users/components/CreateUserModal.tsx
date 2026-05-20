"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { CreateUserRequest } from "../types";
import { useCreateUser } from "../hooks";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const { createUser, isCreating } = useCreateUser();
  const { register, handleSubmit, reset } = useForm<CreateUserRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
      phone: "",
      username: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: CreateUserRequest) => {
    createUser(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-white border border-black rounded">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h2 className="text-sm font-black uppercase tracking-wider">Yangi user</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-neutral-100 rounded" aria-label="Yopish">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
          <input
            {...register("firstName", { required: true })}
            placeholder="First name"
            className="w-full border border-neutral-200 px-3 py-2 text-xs rounded outline-none focus:border-black"
          />
          <input
            {...register("lastName", { required: true })}
            placeholder="Last name"
            className="w-full border border-neutral-200 px-3 py-2 text-xs rounded outline-none focus:border-black"
          />
          <input
            {...register("age", { valueAsNumber: true, required: true })}
            type="number"
            placeholder="Age"
            className="w-full border border-neutral-200 px-3 py-2 text-xs rounded outline-none focus:border-black"
          />
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full border border-neutral-200 px-3 py-2 text-xs rounded outline-none focus:border-black"
          />
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border border-neutral-200 px-3 py-2 text-xs rounded outline-none focus:border-black"
          />
          <input
            {...register("phone")}
            placeholder="Phone"
            className="w-full border border-neutral-200 px-3 py-2 text-xs rounded outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-black text-white border border-black py-2 text-xs font-black uppercase rounded hover:bg-white hover:text-black disabled:opacity-60"
          >
            {isCreating ? "Saqlanmoqda..." : "Qoshish"}
          </button>
        </form>
      </div>
    </div>
  );
};
