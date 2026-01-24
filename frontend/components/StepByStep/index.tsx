"use client";

import { Button } from "@/frontend/ui/button";
import { AppState, Ticket } from "@/types";
import { useCallback, useState } from "react";
import { TicketCard } from "../TicketCard";
import { Icons } from "@/frontend/ui/icons";

export const StepByStep = () => {
    const [appState, setAppState] = useState<AppState>(AppState.SETUP);
    const [userName, setUserName] = useState('');
    const [eventName, setEventName] = useState('');
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);

    const startSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName.trim() || !eventName.trim()) return;
        setStartTime(new Date());
        setAppState(AppState.ACTIVE);
    };

    const generateTicket = () => {
        const nextNumber = tickets.length + 1;
        const newTicket: Ticket = {
            number: nextNumber,
            timestamp: new Date()
        };
        setTickets(prev => [newTicket, ...prev]);
    };

    const finishSession = () => {
        setAppState(AppState.SUMMARY);
    };

    const restart = () => {
        setUserName('');
        setEventName('');
        setTickets([]);
        setStartTime(null);
        setAppState(AppState.SETUP);
    };

    const exportCSV = useCallback(() => {
        if (!startTime) return;
      
        let csv = "data:text/csv;charset=utf-8,";
      
        csv += `Relatório de Senhas\n`;
        csv += `Atendente,${userName}\n`;
        csv += `Evento,${eventName}\n`;
        csv += `Data de Início,${startTime.toLocaleString('pt-BR')}\n`;
        csv += `Total de Senhas,${tickets.length}\n\n`;
      
        csv += `Numero da Senha,Horario\n`;
      
        tickets.forEach(t => {
          csv += `${t.number},${t.timestamp.toLocaleTimeString('pt-BR')}\n`;
        });
      
        const encodedUri = encodeURI(csv);
        const link = document.createElement("a");
        link.href = encodedUri;
        link.download = `relatorio_senhas_${eventName.replace(/\s+/g, '_')}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, [userName, eventName, startTime, tickets]);

    const latestTicket = tickets[0];

    return (
        <main>
            {appState === AppState.SETUP && (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Configurar Sessão</h2>
                    <form onSubmit={startSession} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Seu Nome</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Icons.User />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ex: Maria Silva"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Nome do Evento</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Icons.Event />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ex: Credenciamento Tech2024"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button fullWidth size="lg">Começar Atendimentos</Button>
                    </form>
                </div>
            )}

            {appState === AppState.ACTIVE && (
                <div className="space-y-6 animate-in fade-in duration-500">
                    {/* Stats Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                {userName.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Atendente</p>
                                <p className="font-bold text-slate-700">{userName}</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
                        <div className="text-center md:text-left">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Evento</p>
                            <p className="font-bold text-slate-700">{eventName}</p>
                        </div>
                        <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
                        <div className="text-center md:text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total de Senhas</p>
                            <p className="font-black text-indigo-600 text-xl">{tickets.length}</p>
                        </div>
                    </div>

                    {/* Ticket Display Area */}
                    {latestTicket ? (
                        <TicketCard
                            number={latestTicket.number}
                            eventName={eventName}
                            timestamp={latestTicket.timestamp}
                        />
                    ) : (
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
                            <p className="text-slate-400 font-medium">Nenhuma senha gerada ainda.</p>
                            <p className="text-slate-300 text-sm mt-1">Clique no botão abaixo para começar.</p>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sticky bottom-8 pt-4">
                        <Button size="xl" onClick={generateTicket} className="shadow-2xl">
                            <Icons.Plus /> Gerar Próxima Senha
                        </Button>
                        <Button size="xl" variant="outline" onClick={finishSession}>
                            <Icons.Check /> Finalizar Sessão
                        </Button>
                    </div>

                    {/* History Preview */}
                    {tickets.length > 1 && (
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm overflow-hidden">
                            <h3 className="flex items-center font-bold text-slate-700 mb-4">
                                <Icons.History /> Últimas Senhas
                            </h3>
                            <div className="divide-y divide-slate-50">
                                {tickets.slice(1, 5).map((t, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-3">
                                        <span className="font-black text-slate-400">#{t.number.toString().padStart(3, '0')}</span>
                                        <span className="text-sm text-slate-400">{t.timestamp.toLocaleTimeString('pt-BR')}</span>
                                    </div>
                                ))}
                            </div>
                            {tickets.length > 5 && (
                                <p className="text-center text-xs text-slate-300 mt-4 italic">+ {tickets.length - 5} senhas no histórico</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {appState === AppState.SUMMARY && (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100 text-center animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icons.Check />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Sessão Finalizada!</h2>
                    <p className="text-slate-500 mb-8 font-medium">Os dados do evento foram processados com sucesso.</p>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Total Gerado</p>
                            <p className="text-2xl font-black text-slate-800">{tickets.length} senhas</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Duração</p>
                            <p className="text-2xl font-black text-slate-800">
                                {startTime ? `${Math.floor((new Date().getTime() - startTime.getTime()) / 60000)} min` : '-'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button fullWidth size="lg" variant="secondary" onClick={exportCSV}>
                            <Icons.Download /> Baixar Relatório (CSV)
                        </Button>
                        <Button fullWidth size="lg" variant="outline" onClick={restart}>
                            Nova Sessão
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );
};