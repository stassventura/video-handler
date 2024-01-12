import bot from "../../bot";
import { addTextToVideo } from "../../lib/utils/add-text-to-video";
import deleteFile from "./remove-video";

export const startProcess = async (job) => {
  return new Promise<void | string>(async (resolve, reject) => {
    try {
      await addTextToVideo(
        job.data.inputPath,
        job.data.outputPath,
        job.data.text,
        job.data.fontName,
      );
      await bot.telegram.sendVideo(job.data.chatId, {
        source: job.data.outputPath,
      });
      try {
        await deleteFile(job.data.outputPath, job.data.inputPath);
      } catch (err) {
        console.error(`Ошибка при удалении файла: ${err.message}`);
      }
      resolve();
    } catch (err) {
      console.error(err);
      reject(typeof err === "string" ? err : "Ошибка при обработке видео");
    }
  });
};
