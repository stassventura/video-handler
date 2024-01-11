import bot from "../../bot";
import { addTextToVideo } from "../../lib/utils/add-text-to-video";

export const startProcess = async (job) => {
  return new Promise<void | string>(async (resolve, reject) => {
    try {
      console.log("Начинаю обработку");
      await addTextToVideo(
        job.data.inputPath,
        job.data.outputPath,
        job.data.text,
      );

      // console.log(path.join(__dirname, '..', job.data.outputPath));
      // const videoPath = path.join(__dirname, '..', job.data.outputPath);
      const video =
        "https://qc77dpzg-3000.euw.devtunnels.ms/data/videos-1704985662769.mp4";
      console.log(2, job.data.outputPath, video);

      await bot.telegram.sendMessage(job.data.chatId, video);
      console.log(3);

      resolve(); // Разрешить промис при успешном выполнении
    } catch (err) {
      console.error(err);
      reject(typeof err === "string" ? err : "Ошибка при обработке видео"); // Отклонить промис в случае ошибки
    }
  });
};
