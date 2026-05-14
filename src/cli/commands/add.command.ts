import { Command } from "commander";
import { ExpenseService } from "../../services/expense.service";
import { ExpenseRepository } from "../../repositories/expense.repository";
import { createExpenseSchema } from "../../validators/expense.validator";
import { Logger } from "../../utils/logger";
import { getEnabledCategories } from "trace_events";

const expenseService = new ExpenseService(new ExpenseRepository(),);
export function registerAddCommand(program: Command): void{
    program
    .command("add")
    .description("Add a new expense")
    .requiredOption("--amount <amount>")
    .requiredOption("--title <title>")
    .requiredOption("--category <category>")
    .requiredOption("--date <date>")
    .action(async (options)=>{
        const parsed = createExpenseSchema.parse({
            title: options.title,
            amount: options.amount,
            category: options.category,
            date: options.date, 
        });

        const expense = await expenseService.addExpense(parsed);
        Logger.success(`Expense added with ID ${expense.id}`);
    });

}