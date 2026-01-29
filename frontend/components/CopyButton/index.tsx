"use client";

import { useState } from "react";
import { Plus, Trash2, ExternalLink, Copy, CheckCircle2, LogOut, User } from "lucide-react";

interface CopyButtonProps {
    id: number;
    link: string;
}

export default function CopyButton({ id, link }: CopyButtonProps) {
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const copyToClipboard = (id: number) => {
        navigator.clipboard.writeText(`${window.location.host}${link}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <button
            onClick={() => copyToClipboard(id)}
            className={`p-3 rounded-xl transition-all flex items-center cursor-pointer gap-2 ${copiedId === id ? 'bg-green-100 text-green-600' : 'bg-white text-indigo-600 border border-slate-200 hover:border-indigo-300'}`}
        >
            {copiedId === id ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            <span className="text-xs font-bold">{copiedId === id ? 'Copiado' : 'Link'}</span>
        </button>
    );
}