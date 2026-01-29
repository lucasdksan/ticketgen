import { Footer } from "@/frontend/components/Footer";
import { Header } from "@/frontend/components/Header";
import { StepByStep } from "@/frontend/components/StepByStep";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Header />
        <StepByStep />
        <Footer />
      </div>
    </div>
  );
}
