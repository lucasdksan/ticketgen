"use client";

import { Button } from "@/frontend/ui/button";
import { AppState, Ticket, SessionMode, CategoryCount } from "@/types";
import { useCallback, useState } from "react";
import { TicketCard } from "../TicketCard";
import { Icons } from "@/frontend/ui/icons";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const StepByStep = () => {
    const [appState, setAppState] = useState<AppState>(AppState.SETUP);
    const [userName, setUserName] = useState("");
    const [eventName, setEventName] = useState("");
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [sessionMode, setSessionMode] = useState<SessionMode>(SessionMode.TICKETS);
    const [categories, setCategories] = useState<CategoryCount[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    const startSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName.trim() || !eventName.trim()) return;
        setStartTime(new Date());
        setAppState(AppState.ACTIVE);
    };

    const addCategory = () => {
        if (!newCategoryName.trim()) return;
        setCategories(prev => [...prev, { name: newCategoryName.trim(), count: 0 }]);
        setNewCategoryName("");
    };

    const removeCategory = (index: number) => {
        setCategories(prev => prev.filter((_, i) => i !== index));
    };

    const incrementCategory = (index: number) => {
        setCategories(prev => prev.map((cat, i) => 
            i === index ? { ...cat, count: cat.count + 1 } : cat
        ));
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
        setUserName("");
        setEventName("");
        setTickets([]);
        setCategories([]);
        setStartTime(null);
        setAppState(AppState.SETUP);
        setSessionMode(SessionMode.TICKETS);
    };

    const exportExcel = useCallback(async () => {
        if (!startTime) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Relatório");

        const reportTitle = sessionMode === SessionMode.TICKETS ? "Relatório de Senhas" : "Relatório de Contagem por Categoria";

        // Style the title
        worksheet.mergeCells("A1:B1");
        const titleCell = worksheet.getCell("A1");
        titleCell.value = reportTitle;
        titleCell.font = { name: "Arial", size: 16, bold: true, color: { argb: "FFFFFFFF" } };
        titleCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4F46E5" } // Indigo-600
        };
        titleCell.alignment = { vertical: "middle", horizontal: "center" };

        // Add info rows
        worksheet.addRow(["Atendente", userName]);
        worksheet.addRow(["Evento", eventName]);
        worksheet.addRow(["Data de Início", startTime.toLocaleString("pt-BR")]);

        if (sessionMode === SessionMode.TICKETS) {
            worksheet.addRow(["Total de Senhas", tickets.length]);
            worksheet.addRow([]); // Spacer
            
            const headerRow = worksheet.addRow(["Número da Senha", "Horário"]);
            headerRow.font = { bold: true };
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFF1F5F9" } // Slate-100
                };
                cell.border = {
                    bottom: { style: "thin" }
                };
            });

            tickets.forEach(t => {
                worksheet.addRow([t.number, t.timestamp.toLocaleTimeString("pt-BR")]);
            });
        } else {
            const totalCount = categories.reduce((acc, cat) => acc + cat.count, 0);
            worksheet.addRow(["Total de Atendimentos", totalCount]);
            worksheet.addRow([]); // Spacer

            const headerRow = worksheet.addRow(["Categoria", "Quantidade"]);
            headerRow.font = { bold: true };
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFF1F5F9" } // Slate-100
                };
                cell.border = {
                    bottom: { style: "thin" }
                };
            });

            categories.forEach(cat => {
                worksheet.addRow([cat.name, cat.count]);
            });
        }

        // Auto-fit columns
        worksheet.columns.forEach(column => {
            column.width = 25;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const fileName = sessionMode === SessionMode.TICKETS ? "relatorio_senhas" : "relatorio_contagem";
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, `${fileName}_${eventName.replace(/\s+/g, "_")}.xlsx`);
    }, [userName, eventName, startTime, tickets, categories, sessionMode]);

    const latestTicket = tickets[0];

    return (
        <main>
            {appState === AppState.SETUP && (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Configurar Sessão</h2>
                    <form onSubmit={startSession} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1 bg-slate-100 rounded-2xl mb-6">
                            <button
                                type="button"
                                onClick={() => setSessionMode(SessionMode.TICKETS)}
                                className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${sessionMode === SessionMode.TICKETS ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Gerar Senhas
                            </button>
                            <button
                                type="button"
                                onClick={() => setSessionMode(SessionMode.CATEGORIES)}
                                className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${sessionMode === SessionMode.CATEGORIES ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Contador por Categoria
                            </button>
                        </div>

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

                        <Button 
                            fullWidth 
                            size="lg" 
                        >
                            Começar Atendimentos
                        </Button>
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
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                                {sessionMode === SessionMode.TICKETS ? "Total de Senhas" : "Total de Atendimentos"}
                            </p>
                            <p className="font-black text-indigo-600 text-xl">
                                {sessionMode === SessionMode.TICKETS 
                                    ? tickets.length 
                                    : categories.reduce((acc, cat) => acc + cat.count, 0)}
                            </p>
                        </div>
                    </div>

                    {/* Ticket Display Area / Category Counters */}
                    {sessionMode === SessionMode.TICKETS ? (
                        <>
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
                                                <span className="font-black text-slate-400">#{t.number.toString().padStart(3, "0")}</span>
                                                <span className="text-sm text-slate-400">{t.timestamp.toLocaleTimeString("pt-BR")}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {tickets.length > 5 && (
                                        <p className="text-center text-xs text-slate-300 mt-4 italic">+ {tickets.length - 5} senhas no histórico</p>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-6">
                            {/* Dynamic Category Entry */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Nova Categoria</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ex: Dipirona, Atendimento Geral..."
                                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addCategory();
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={addCategory} className="px-6">
                                        Adicionar
                                    </Button>
                                </div>
                            </div>

                            {categories.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categories.map((cat, idx) => (
                                        <div key={idx} className="relative group">
                                            <button
                                                onClick={() => incrementCategory(idx)}
                                                className="w-full bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-left flex justify-between items-center active:scale-95"
                                            >
                                                <div>
                                                    <p className="text-slate-500 font-medium mb-1">{cat.name}</p>
                                                    <p className="text-3xl font-black text-slate-800">{cat.count}</p>
                                                </div>
                                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                    <Icons.Plus size={24} />
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => removeCategory(idx)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 hover:text-white"
                                                title="Remover categoria"
                                            >
                                                <Icons.Plus size={14} className="rotate-45" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
                                    <p className="text-slate-400 font-medium">Nenhuma categoria adicionada.</p>
                                    <p className="text-slate-300 text-sm mt-1">Use o campo acima para criar botões de contagem.</p>
                                </div>
                            )}

                            <div className="sticky bottom-8 pt-4">
                                <Button fullWidth size="xl" variant="outline" onClick={finishSession} className="bg-white shadow-xl">
                                    <Icons.Check /> Finalizar Sessão e Ver Resumo
                                </Button>
                            </div>
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
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                                {sessionMode === SessionMode.TICKETS ? "Total Gerado" : "Total de Atendimentos"}
                            </p>
                            <p className="text-2xl font-black text-slate-800">
                                {sessionMode === SessionMode.TICKETS 
                                    ? `${tickets.length} senhas` 
                                    : `${categories.reduce((acc, cat) => acc + cat.count, 0)} atendimentos`}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Duração</p>
                            <p className="text-2xl font-black text-slate-800">
                                {startTime ? `${Math.floor((new Date().getTime() - startTime.getTime()) / 60000)} min` : "-"}
                            </p>
                        </div>
                    </div>

                    {sessionMode === SessionMode.CATEGORIES && (
                        <div className="mb-8 space-y-3">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-left">Resumo por Categoria</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {categories.map((cat, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                                        <span className="font-bold text-slate-700">{cat.name}</span>
                                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-black">{cat.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Button fullWidth size="lg" variant="secondary" onClick={exportExcel}>
                            <Icons.Download /> Baixar Relatório (Excel)
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
