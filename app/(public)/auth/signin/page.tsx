import FormSignin from "@/frontend/components/FormSignin";
import { signInAction } from "./action";

export default function SignInPage() {
    return (
        <>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Bem-vindo de volta</h2>
                <p className="text-slate-500 mt-2 font-medium">Acesse sua conta para gerenciar eventos</p>
            </div>
            <FormSignin signInAction={signInAction} />
        </>
    )
}