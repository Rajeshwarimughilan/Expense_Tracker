import fs from "fs/promises";
import path from "path";
import { FileError } from "../errors/file-error";

export async function ensureDirectoryExists(
  directoryPath: string,
): Promise<void> {
  try {
    await fs.mkdir(directoryPath, {
      recursive: true,
    });
  } catch (error) {
    throw new FileError(
      `Failed to create directory: ${directoryPath}`,
    );
  }
}

export async function ensureFileExists(
  filePath: string,
): Promise<void> {
  try {
    await fs.access(filePath);
  } catch {
    const directory = path.dirname(filePath);

    await ensureDirectoryExists(directory);

    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

export async function readJSONFile<T>(filePath: string): Promise<T>{
    try{
        await ensureFileExists(filePath);
        const content = await fs.readFile(filePath, "utf-8");

        return JSON.parse(content) as T;
    }catch(error){
        throw new FileError(`Failed to read JSON file: ${filePath}`);
    }
}


export async function writeJSONFile<T>(filePath: string, data: T): Promise<void>{
    try{
        await ensureFileExists(filePath);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2) ,"utf-8");
    }catch(error){
        throw new FileError(`Failed to write JSON file: ${filePath}`);
    }
}

