import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import FormCreateEvent from "@/frontend/components/FormCreateEvent";
import UserBar from "@/frontend/components/UserBar";
import { getCurrentUser } from "@/libs/auth";
import { generateLinksAction } from "./action";
import CopyButton from "@/frontend/components/CopyButton";

export default async function Home() {
    const user = await getCurrentUser();

    if (!user) redirect("/auth/signin");

    const { events, success, message } = await generateLinksAction(Number(user.sub));

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <UserBar user={{ name: user.name, email: user.email }} />

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Configurar Novo Evento</h2>
                <FormCreateEvent />
            </section>
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Seus Eventos</h2>
                <div className="space-y-4">
                    { !success && events.length === 0 ? (
                        <p className="text-slate-400 text-center py-8">Nenhum evento criado ainda.</p>
                    ) : (
                        <>
                            { events.map((event) => (
                                <div key={event.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50 flex items-center justify-between group">
                                <div>
                                  <h3 className="font-bold text-slate-800">{event.name}</h3>
                                  <p className="text-sm text-slate-500">{event.attendant} • {event.categories.length} categorias</p>
                                </div>
                                <div className="flex gap-2">
                                  <CopyButton id={event.id} link={event.link} />
                                  <Link
                                    href={event.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-white text-slate-600 border border-slate-200 rounded-xl hover:border-indigo-300 transition-all"
                                  >
                                    <ExternalLink size={18} />
                                  </Link>
                                </div>
                              </div>
                            )) }
                        </>
                    ) }
                </div>
            </section>
        </div>
    );
}
