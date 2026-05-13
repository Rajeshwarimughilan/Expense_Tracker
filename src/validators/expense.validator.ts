import {z} from "zod";
import {DATE_FORMAT_REGEX} from "../config/constants";
import { number } from "zod/v4";

export const createExpenseScheme = z.object({
    title: z.string().trim().min(1, "Title is required").max(100, "title is too long"),
    amount: z.number({invalid_type_error: "Amount must be a number"}).positive("Amount must be positive"),
    category: z.string().trim().min(1, "Category is required").max(50, "Category is too long"),
    date: z.string().regex(DATE_FORMAT_REGEX, "Date must be YYYY-MM-DD"),
});

export const filteredExpenseScheme = z.object({
    category: z.string().optional(),
    startDate: z.string().regex(DATE_FORMAT_REGEX).optional(),
    endDate: z.string().regex(DATE_FORMAT_REGEX).optional(),
});