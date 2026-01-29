import { logoutAction } from "@/app/(public)/auth/logout/action";
import { LogOut, User } from "lucide-react";

interface UserBarProps {
    user: {
        name: string;
        email: string;
    };
}

export default function UserBar({ user }: UserBarProps) {
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <User size={16} />
                </div>
                <span className="text-sm font-bold text-indigo-900">{user?.email}</span>
            </div>
            <form action={logoutAction}>
                <button
                    type="submit"
                    className="cursor-pointer flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    <LogOut size={16} />
                    Sair
                </button>
            </form>
        </div>
    );
}