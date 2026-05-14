import { buildProgram } from "./cli/program";
import { handleCLIError } from "./cli/handlers/error.handler";

async function bootstrap(): Promise<void> {
  try {
    const program = buildProgram();

    await program.parseAsync(process.argv);//commander mus wait for async operatio like fetching the full path
  } catch (error) {
    handleCLIError(error);
  }
}

void bootstrap();//void here is NOT return type.evaluates expression and discards result.