import {z} from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const envSchmea = z.object({
    NODE_ENV : z
    .enum(["development", "production", "test"])
    .default("development"),

    DATA_DIRECTORY : z.string().default("data"),
    EXPORT_DIRECTORY : z.string().default("exports"),
    EXPENSE_FILE_NAME : z.string().default("expense.json"),

});

const parsedEnv = envSchmea.safeParse(process.env);
if(!parsedEnv.success){
    console.error("Invalid environment configuration");
    console.error(parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
}

const env = parsedEnv.data;


export const ENV = {
    NODE_ENV : env.NODE_ENV,
    DATA_DIRECTORY: path.resolve(process.cwd(), env.DATA_DIRECTORY),
    EXPORT_DIRECTORY: path.resolve(process.cwd(), env.EXPORT_DIRECTORY),
    EXPENSE_FILE_PATH: path.resolve(process.cwd(), env.DATA_DIRECTORY, env.EXPENSE_FILE_NAME),
};