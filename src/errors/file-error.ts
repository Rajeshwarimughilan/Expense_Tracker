import { AppError } from "./app-error";

export class FileError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}