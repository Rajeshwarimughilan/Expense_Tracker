import { Expense } from "../types/expense.types";
import { CSV_HEADERS } from "../config/constants";

export function convertExpenseToCSV(expenses: Expense[]) :string{
    const rows = expenses.map((expense) =>
    [
        expense.id,
        escapeCSV(expense.title),
        expense.amount,
        escapeCSV(expense.category),
        expense.date,
        expense.createdAt,
    ].join(","),
    );

    return [CSV_HEADERS.join(","), ...rows].join("\n");
}

function escapeCSV(value: string): string{
    const escaped = value.replace(/"/g, '""');

        return `"${escaped}"`;
}