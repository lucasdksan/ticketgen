export default function AuthTemplate({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-slate-100">
                {children}
            </div>
        </div>
    );
}