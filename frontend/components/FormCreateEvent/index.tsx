"use client";

import { useActionState, useState } from "react";
import { createEventTemplateAction } from "@/app/(private)/dashboard/(home)/action";
import { CreateEventState, CategoryCount } from "@/types";
import { Loader2, Plus, X } from "lucide-react";

const initialState: CreateEventState = {
    success: false,
    errors: null,
    message: "",
};

export default function FormCreateEvent() {
    const [state, formAction, isPending] = useActionState(createEventTemplateAction, initialState);
    const [categories, setCategories] = useState<CategoryCount[]>([]);
    const [categoryInput, setCategoryInput] = useState("");

    const handleAddCategory = () => {
        if (!categoryInput.trim()) return;
        
        // Prevent duplicate categories
        if (categories.some(cat => cat.name.toLowerCase() === categoryInput.trim().toLowerCase())) {
            setCategoryInput("");
            return;
        }

        setCategories(prev => [...prev, { name: categoryInput.trim(), count: 0 }]);
        setCategoryInput("");
    };

    const handleRemoveCategory = (index: number) => {
        setCategories(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <form action={formAction} className="space-y-6">
            {state.message && (
                <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${
                    state.success 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                        : "bg-red-50 border-red-200 text-red-600"
                }`}>
                    {state.message}
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 ml-1">Nome do Evento</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Ex: Credenciamento Tech2024"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        state.errors?.name ? "border-red-300 focus:ring-2 focus:ring-red-500" : "border-slate-200 focus:ring-2 focus:ring-indigo-500"
                    }`}
                />
                {state.errors?.name && (
                    <p className="text-xs text-red-500 ml-1">{state.errors.name[0]}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 ml-1">Responsável (Atendente)</label>
                <input
                    name="attendant"
                    type="text"
                    placeholder="Seu nome"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        state.errors?.attendant ? "border-red-300 focus:ring-2 focus:ring-red-500" : "border-slate-200 focus:ring-2 focus:ring-indigo-500"
                    }`}
                />
                {state.errors?.attendant && (
                    <p className="text-xs text-red-500 ml-1">{state.errors.attendant[0]}</p>
                )}
            </div>

            <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 ml-1">Categorias de Contagem</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCategory();
                            }
                        }}
                        placeholder="Ex: Credencial, Kit, Brinde..."
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-slate-100 cursor-pointer text-slate-700 px-4 rounded-xl font-bold hover:bg-slate-200 transition-colors border border-slate-200"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                
                {/* Hidden input to send categories as JSON */}
                <input type="hidden" name="categories" value={JSON.stringify(categories)} />

                {categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {categories.map((cat, idx) => (
                            <span 
                                key={idx} 
                                className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-bold border border-indigo-100 animate-in zoom-in-95 duration-200"
                            >
                                {cat.name}
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveCategory(idx)}
                                    className="hover:text-indigo-800 transition-colors cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-slate-400 ml-1 italic">Nenhuma categoria adicionada. O evento usará apenas o contador geral se não houver categorias.</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 text-white py-4 cursor-pointer rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
            >
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Criando Evento...
                    </>
                ) : (
                    <>
                        Gerar Link do Evento
                    </>
                )}
            </button>
        </form>
    );
}
