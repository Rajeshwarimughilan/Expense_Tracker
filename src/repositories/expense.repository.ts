import { ENV } from "../config/env";
import { Expense } from "../types/expense.types";
import {readJSONFile, writeJSONFile} from "../utils/file.util";

export class ExpenseRepository{
    async findAll(): Promise<Expense[]>{
        return readJSONFile<Expense[]>(ENV.EXPENSE_FILE_PATH);
    }

    async saveAll(expenses: Expense[]): Promise<void>{
       await writeJSONFile<Expense[]>(ENV.EXPENSE_FILE_PATH, expenses);
    }
}