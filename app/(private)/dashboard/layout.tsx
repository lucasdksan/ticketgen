import { Header } from "@/frontend/components/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="w-full max-w-2xl py-4 mx-auto">
                {children}
            </main>
        </>
    );
}