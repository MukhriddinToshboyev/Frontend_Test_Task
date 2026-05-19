"use client";

import { useGetUsers } from "../hooks/useGetUsers";
import { IUser } from "../types/users.types";

export const UsersTable = () => {
    const { data, isLoading, isError } = useGetUsers();

   const users = (data?.users ?? []).filter((user: IUser) => user.role === "user");

    console.log("users", users);

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
            <div className="mb-4">
                <h1 className="text-xl font-black uppercase tracking-wider">
                    Foydalanuvchilar
                </h1>
                <p className="text-[11px] text-neutral-500 uppercase mt-0.5">
                    Jami: {data?.total} ta foydalanuvchi
                </p>
            </div>

             <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 text-[10px] font-black uppercase rounded bg-red-100 text-red-600">
                        Admin
                    </span>
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
                                    {user.id}
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
        </div>
    );
};