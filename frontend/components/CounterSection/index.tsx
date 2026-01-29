"use client";

import { Plus } from "lucide-react";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import ExcelButton from "./ExcelButton";

interface CounterSectionProps {
    categories: Category[];
    userName: string;
    eventName: string;
}

export default function CounterSection({ categories, userName, eventName }: CounterSectionProps) {
    const [session, setSession] = useState<Category[] | null>(null);

    useEffect(() => {
        setSession(categories);
    }, [categories]);

    const increment = (catId: number) => {
        if (!session) return;
    
        const newCategories = session.map(c => 
          c.id === catId ? { ...c, count: c.count + 1 } : c
        );
    
        setSession(newCategories);
      }

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all"
                >
                    <div>
                        <p className="text-slate-500 font-medium mb-1">{category.name}</p>
                        <span className="text-4xl font-black text-slate-800">{session?.find(c => c.id === category.id)?.count || 0}</span>
                    </div>
                    <button
                        onClick={() => increment(category.id)}
                        className="cursor-pointer w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-indigo-100/50"
                    >
                        <Plus size={32} strokeWidth={3} />
                    </button>
                </div>
            ))}
        </div>
        <ExcelButton userName={userName} eventName={eventName} categories={session || []} />
        </>
    );
}