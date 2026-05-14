import { Command } from "commander";
import { ExpenseService } from "../../services/expense.service";
import { ExpenseRepository } from "../../repositories/expense.repository";
import { Logger } from "../../utils/logger";

const expenseService = new ExpenseService(
  new ExpenseRepository(),
);

export function registerDeleteCommand(
  program: Command,
): void {
  program
    .command("delete")
    .requiredOption("--id <id>")
    .action(async (options) => {
      await expenseService.deleteExpense(options.id);

      Logger.success("Expense deleted");
    });
}