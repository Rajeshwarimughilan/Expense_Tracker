import { Command } from "commander";
import { registerAddCommand } from "./commands/add.command";
import { registerDeleteCommand } from "./commands/delete.command";
import { registerExportCommand } from "./commands/export.command";
import { registerListCommand } from "./commands/list.command";
import { registerSummaryCommand } from "./commands/summary.command";

export function buildProgram(): Command {
  const program = new Command();

  program
    .name("expense-tracker")
    .description("CLI Expense Tracker")
    .version("1.0.0");

  registerAddCommand(program);
  registerListCommand(program);
  registerDeleteCommand(program);
  registerSummaryCommand(program);
  registerExportCommand(program);

  return program;
}