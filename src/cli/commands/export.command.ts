import { Command } from "commander";
import fs from "fs/promises";
import path from "path";
import { ExpenseService } from "../../services/expense.service";
import { ExpenseRepository } from "../../repositories/expense.repository";
import { convertExpensesToCSV } from "../../utils/csv.util";
import { ENV } from "../../config/env";
import { Logger } from "../../utils/logger";

const expenseService = new ExpenseService(
  new ExpenseRepository(),
);

export function registerExportCommand(
  program: Command,
): void {
  program
    .command("export")
    .option("--output <output>")
    .action(async (options) => {
      const expenses =
        await expenseService.listExpenses();

      const csv =
        convertExpensesToCSV(expenses);

      const fileName =
        options.output ||
        `expenses-${Date.now()}.csv`;

      const exportPath = path.resolve(
        ENV.EXPORT_DIRECTORY,
        fileName,
      );

      await fs.mkdir(ENV.EXPORT_DIRECTORY, {
        recursive: true,
      });

      await fs.writeFile(exportPath, csv);

      Logger.success(
        `CSV exported to ${exportPath}`,
      );
    });
}