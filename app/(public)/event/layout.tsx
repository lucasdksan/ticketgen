import { Header } from "@/frontend/components/Header";

export default function EventLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-500">
                {children}
            </div>
        </>
    );
}