import fs from "fs/promises";

async function deleteFile(inputfilePath: string, outputfilePath: string) {
  try {
    await fs.unlink(inputfilePath);
    await fs.unlink(outputfilePath);
  } catch (err) {
    console.error(`Ошибка при удалении файла: ${err.message}`);
  }
}

export default deleteFile;
