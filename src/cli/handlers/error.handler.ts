import { AppError } from "../../errors/app-error";
import { Logger } from "../../utils/logger";

export function handleCLIError(error: unknown): never{
    if(error instanceof AppError){
        Logger.error(error.message);
        process.exit(error.statusCode);
    }

    Logger.error("Unexpected application error");
    process.exit(500);
}