export const Header = () => {
    return (
        <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 mb-4 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-800">Ticket<span className="text-indigo-600">Gen</span></h1>
            <p className="text-slate-500 font-medium mt-1">Gestão de atendimento profissional</p>
        </header>
    );
}