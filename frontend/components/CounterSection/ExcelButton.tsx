"use client";

import { Button } from "@/frontend/ui/button";
import { Icons } from "@/frontend/ui/icons";
import { Category } from "@/types";
import { useCallback, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface ExcelButtonProps {
    userName: string;
    eventName: string;
    categories: Category[];
}

export default function ExcelButton({ 
    userName, 
    eventName, 
    categories 
}: ExcelButtonProps) {
    const [startTime] = useState(new Date());
    
    const exportExcel = useCallback(async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Relatório");
        const endTime = new Date();
        const durationMin = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);

        const reportTitle = "Relatório de Contagem por Categoria";

        worksheet.mergeCells("A1:C1");
        const titleCell = worksheet.getCell("A1");
        titleCell.value = reportTitle;
        titleCell.font = { name: "Arial", size: 18, bold: true, color: { argb: "FFFFFFFF" } };
        titleCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4F46E5" }
        };
        titleCell.alignment = { vertical: "middle", horizontal: "center" };
        worksheet.getRow(1).height = 40;

        const infoRows = [
            ["Evento", eventName],
            ["Atendente", userName],
            ["Data de Início", startTime.toLocaleString("pt-BR")],
            ["Data de Término", endTime.toLocaleString("pt-BR")],
            ["Duração Total", `${durationMin} minutos`],
            []
        ];

        infoRows.forEach((row) => {
            const addedRow = worksheet.addRow(row);
            addedRow.getCell(1).font = { bold: true, color: { argb: "FF475569" } };
        });

        const totalCount = categories.reduce((acc, cat) => acc + cat.count, 0);
        worksheet.addRow(["Total Geral de Atendimentos", totalCount]).getCell(1).font = { bold: true };
        worksheet.addRow([]);

        const headerRow = worksheet.addRow(["#", "Categoria", "Quantidade"]);
        headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF6366F1" }
            };
            cell.alignment = { horizontal: "center" };
        });

        categories.forEach((cat, index) => {
            const row = worksheet.addRow([
                index + 1,
                cat.name,
                cat.count
            ]);
            row.getCell(1).alignment = { horizontal: "center" };
            row.getCell(3).alignment = { horizontal: "center" };

            if (index % 2 === 1) {
                row.eachCell(cell => {
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFF8FAFC" }
                    };
                });
            }
        });

        worksheet.columns.forEach((column) => {
            let maxLength = 0;
            column.eachCell!({ includeEmpty: true }, (cell) => {
                const columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 15 ? 15 : maxLength + 5;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const dateStr = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
        const cleanEventName = eventName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
        const fileName = `relatorio_contagem_${cleanEventName}_${dateStr}.xlsx`;
        
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, fileName);
    }, [userName, eventName, startTime, categories]);
    
    return (
        <Button fullWidth size="lg" variant="secondary" onClick={exportExcel}>
            <Icons.Download /> Baixar Relatório (Excel)
        </Button>
    );
}
