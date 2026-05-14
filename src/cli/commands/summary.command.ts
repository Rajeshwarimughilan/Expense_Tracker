import { Command } from "commander";
import { ExpenseService } from "../../services/expense.service";
import { ExpenseRepository } from "../../repositories/expense.repository";

const expenseService = new ExpenseService(
  new ExpenseRepository(),
);

export function registerSummaryCommand(
  program: Command,
): void {
  program
    .command("summary")
    .action(async () => {
      const total =
        await expenseService.getSummary();

      console.log(`Total Expenses: ₹${total}`);
    });
}