import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button component", () => {
    it("renderiza o children corretamente", () => {
        render(<Button>Salvar</Button>);
        expect(screen.getByText("Salvar")).toBeInTheDocument();
    });

    it("usa variant primary por padrão", () => {
        render(<Button>Primary</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("bg-indigo-600");
    });

    it("renderiza o variant secondary", () => {
        render(<Button variant="secondary">Sec</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("bg-emerald-500");
    });

    it("renderiza o variant danger", () => {
        render(<Button variant="danger">Excluir</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("bg-rose-500");
    });

    it("renderiza o variant outline", () => {
        render(<Button variant="outline">Outline</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("border-slate-200");
    });

    it("aplica tamanho md por padrão", () => {
        render(<Button>Padrao</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("text-base");
    });

    it("aplica tamanho lg", () => {
        render(<Button size="lg">Grande</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("text-lg");
    });

    it("aplica fullWidth quando true", () => {
        render(<Button fullWidth>Full</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("w-full");
    });

    it("mantém classes extra via className", () => {
        render(<Button className="extra-class">Teste</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("extra-class");
    });

    it("propaga atributos para o botão (ex: disabled)", () => {
        render(<Button disabled>Off</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toBeDisabled();
    });
});
