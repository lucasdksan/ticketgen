import { Header } from "@/frontend/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Área de Login",
    description: "área do sistema de login do site.",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="w-full h-full">
                {children}
            </main>
        </>
    )
}