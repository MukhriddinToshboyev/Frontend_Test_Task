"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useGetUsers } from "../hooks";
import { IUser } from "../types";
import { CreateUserModal } from "./CreateUserModal";

export const UsersTable = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const { data, isLoading, isError } = useGetUsers();

   const users = (data?.users ?? []).filter((user: IUser) => user.role === "user");

    if (isLoading) {
        return (
            <div className="text-center py-10 text-xs font-mono uppercase">
                Yuklanmoqda...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-xs text-red-500 font-mono uppercase">
                Xatolik yuz berdi!
            </div>
        );
    }

    return (
        <div className="font-mono">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black uppercase tracking-wider">
                        Foydalanuvchilar
                    </h1>
                    <p className="text-[11px] text-neutral-500 uppercase mt-0.5">
                        Jami: {data?.total} ta foydalanuvchi
                    </p>
                </div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="h-10 w-10 flex items-center justify-center bg-black text-white border border-black rounded hover:bg-white hover:text-black"
                    aria-label="Yangi user qoshish"
                >
                    <Plus size={18} />
                </button>
            </div>

            <div className="border border-neutral-200 rounded overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-neutral-100 border-b border-neutral-200">
                        <tr>
                            <th className="text-left px-4 py-3 text-[11px] font-black uppercase">#</th>
                            <th className="text-left px-4 py-3 text-[11px] font-black uppercase">Foydalanuvchi</th>
                            <th className="text-left px-4 py-3 text-[11px] font-black uppercase">Email</th>
                            <th className="text-left px-4 py-3 text-[11px] font-black uppercase">Telefon</th>
                            <th className="text-left px-4 py-3 text-[11px] font-black uppercase">Kompaniya</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser) => (
                            <tr
                                key={user.id}
                                className="border-b border-neutral-100 hover:bg-neutral-50 transition-all"
                            >
                                <td className="px-4 py-3 text-[11px] text-neutral-400">
                                    {user.id - 15}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={user.image}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                                        />
                                        <div>
                                            <p className="text-[11px] font-bold uppercase">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-[10px] text-neutral-400">
                                                @{user.username}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-[11px] text-neutral-600">
                                    {user.email}
                                </td>
                                <td className="px-4 py-3 text-[11px] text-neutral-600">
                                    {user.phone}
                                </td>
                                <td className="px-4 py-3">
                                    <p className="text-[11px] font-bold">{user.company.name}</p>
                                    <p className="text-[10px] text-neutral-400">{user.company.title}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateUserModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
        </div>
    );
};
