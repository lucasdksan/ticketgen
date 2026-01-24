import React from 'react';

interface TicketCardProps {
    number: number;
    eventName: string;
    timestamp: Date;
}

export const TicketCard: React.FC<TicketCardProps> = ({ number, eventName, timestamp }) => {
    return (
        <div className="bg-white border-2 border-dashed border-indigo-200 rounded-3xl p-8 relative overflow-hidden shadow-sm animate-in fade-in zoom-in duration-300">
            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-slate-50 rounded-full border-r-2 border-indigo-100 -translate-y-1/2"></div>
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-slate-50 rounded-full border-l-2 border-indigo-100 -translate-y-1/2"></div>

            <div className="text-center">
                <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest block mb-2">{eventName}</span>
                <h2 className="text-7xl font-black text-slate-800 mb-2">#{number.toString().padStart(3, '0')}</h2>
                <p className="text-slate-400 text-sm font-medium">
                    {timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
            </div>
        </div>
    );
};
