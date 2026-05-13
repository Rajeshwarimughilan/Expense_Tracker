import { ExpenseRepository } from "../repositories/expense.repository";
import {
  CreateExpenseDTO,
  Expense,
  ExpenseFilter,
} from "../types/expense.types";
import { generateId } from "../utils/id.util";
import { isDateInRange } from "../utils/date.util";
import { NotFoundError } from "../errors/not-found-error";

export class ExpenseService {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async addExpense(
    payload: CreateExpenseDTO,
  ): Promise<Expense> {
    const expenses =
      await this.expenseRepository.findAll();

    const expense: Expense = {
      id: generateId(),
      title: payload.title,
      amount: payload.amount,
      category: payload.category,
      date: payload.date,
      createdAt: new Date().toISOString(),
    };

    expenses.push(expense);

    await this.expenseRepository.saveAll(expenses);

    return expense;
  }

  async listExpenses(
    filters?: ExpenseFilter,
  ): Promise<Expense[]> {
    const expenses =
      await this.expenseRepository.findAll();

    return expenses.filter((expense) => {
      const categoryMatch = filters?.category
        ? expense.category.toLowerCase() ===
          filters.category.toLowerCase()
        : true;

      const dateMatch = isDateInRange(
        expense.date,
        filters?.startDate,
        filters?.endDate,
      );

      return categoryMatch && dateMatch;
    });
  }

  async deleteExpense(id: string): Promise<void> {
    const expenses =
      await this.expenseRepository.findAll();

    const exists = expenses.some(
      (expense) => expense.id === id,
    );

    if (!exists) {
      throw new NotFoundError(
        `Expense with ID ${id} not found`,
      );
    }

    const filtered = expenses.filter(
      (expense) => expense.id !== id,
    );

    await this.expenseRepository.saveAll(filtered);
  }

  async getSummary(): Promise<number> {
    const expenses =
      await this.expenseRepository.findAll();

    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
  }
}