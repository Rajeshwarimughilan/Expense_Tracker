export interface Expense {
    id: string;
    title: string;
    amount: string;
    category: string;
    date: string;
    createdAt: string;
}

export interface CreateExpenseDTO {
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseFilter{
    category?: string;
    startDate?: string;
    endDate?: string;
}