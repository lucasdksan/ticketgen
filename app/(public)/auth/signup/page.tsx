import FormSignup from "@/frontend/components/FormSignup";
import { signUpAction } from "./action";

export default function SignUpPage() {
    return (
        <>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Crie sua conta</h2>
                <p className="text-slate-500 mt-2 font-medium">Acesse sua conta para gerenciar eventos</p>
            </div>
            <FormSignup signUpAction={signUpAction} />
        </>
    )
}