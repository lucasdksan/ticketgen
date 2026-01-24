import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icons } from "../icons";

describe("Icons", () => {
    it("renderiza todos os ícones sem erro", () => {
        Object.entries(Icons).forEach(([name, Icon]) => {
            expect(() => render(<Icon />)).not.toThrow();
        });
    });
});
