import CounterSection from "@/frontend/components/CounterSection";
import { getEventAction } from "./action";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [userId, eventId] = slug.split("-");

    const { success, event, message } = await getEventAction(Number(userId), Number(eventId));

    if (!success) {
        return <div>{message}</div>;
    }

    if (!event) {
        return <div>{message}</div>;
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    return (
        <>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                        {event.attendant[0].toUpperCase()}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atendente</p>
                        <h3 className="font-bold text-slate-700 leading-tight">{event.attendant}</h3>
                    </div>
                </div>

                <div className="hidden md:block h-10 w-px bg-slate-100"></div>

                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Evento</p>
                    <h3 className="font-bold text-slate-700 leading-tight">{event.name}</h3>
                </div>

                <div className="hidden md:block h-10 w-px bg-slate-100"></div>

                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data do Evento</p>
                    <h3 className="font-bold text-slate-700 leading-tight">{formatDate(event.createdAt)}</h3>
                </div>
            </div>
            <CounterSection userName={event.attendant} eventName={event.name} categories={event.categories} />
        </>
    );
}