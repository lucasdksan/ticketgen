"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Loader2, User } from "lucide-react";
import { SignUpState } from "@/types";


const initialState = {
    success: false,
    user: null,
    errors: null,
    message: "",
};

export interface FormSignupProps {
    signUpAction: (prevState: SignUpState, formData: FormData) => Promise<SignUpState>;
}

export default function FormSignup({ signUpAction }: FormSignupProps) {
    const [state, formAction, isPending] = useActionState(signUpAction, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push("/dashboard");
        }
    }, [state.success, router]);

    return (
        <form action={formAction} className="space-y-6">
            {state.message && !state.success && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium">
                    {state.message}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1">Nome</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <User size={20} />
                    </div>
                    <input
                        name="name"
                        type="text"
                        placeholder="Ex: Maria Silva"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        required
                    />
                </div>
                {state.errors?.name && (
                    <p className="text-xs text-red-500 ml-1">{state.errors.name}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1">E-mail</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Mail size={20} />
                    </div>
                    <input
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        required
                    />
                </div>
                {state.errors?.email && (
                    <p className="text-xs text-red-500 ml-1">{state.errors.email}</p>
                )}
            </div>


            <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold text-slate-600">Senha</label>
                    {/* <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Esqueceu a senha?</button> */}
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Lock size={20} />
                    </div>
                    <input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        required
                    />
                </div>
                {state.errors?.password && (
                    <p className="text-xs text-red-500 ml-1">{state.errors.password}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Confirmar senha</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Lock size={20} />
                    </div>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        required
                    />
                </div>
                {state.errors?.confirmPassword && (
                    <p className="text-xs text-red-500 ml-1">{state.errors.confirmPassword}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Código de acesso</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Lock size={20} />
                    </div>
                    <input
                        name="accessCode"
                        type="text"
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        required
                    />
                </div>
                {state.errors?.accessCode && (
                    <p className="text-xs text-red-500 ml-1">{state.errors.accessCode}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
            >
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Entrando...
                    </>
                ) : (
                    <>
                        Entrar
                        <ArrowRight size={20} />
                    </>
                )}
            </button>
        </form>
    )
}