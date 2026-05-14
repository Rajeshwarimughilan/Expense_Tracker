import { Command } from "commander";
import { ExpenseService } from "../../services/expense.service";
import { ExpenseRepository } from "../../repositories/expense.repository";

const expenseService = new ExpenseService(new ExpenseRepository());

export function registerListCommand(program: Command): void{
    program
    .command("list")
    .description("Categorize expenses based on filter")
    .option("--category <category")
    .option("--startDate <startDate>")
    .option("--endDate <endDate>")
    .action(async (options) => {
        const expenses = await expenseService.listExpenses({
            category: options.category,
            startDate: options.startDate,
            endDate: options.endDate,
        });

        if(expenses.length === 0){
            console.log("No Expenses found");
            return;
        }

        console.table(expenses);
    });
}