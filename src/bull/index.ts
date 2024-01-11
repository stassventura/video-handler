import Queue from "bull";
import { startProcess } from "../lib/utils/start-process";

const videoProcessingQueue = new Queue(
  "video-processing",
  "redis://127.0.0.1:6379",
);

videoProcessingQueue.process(async function (job, done) {
  try {
    console.log(job);
    await startProcess(job);
    console.log("Закончил обработку");
    done();
  } catch (err: unknown) {
    done(
      new Error(typeof err === "string" ? err : "Ошибка при обработке видео"),
    );
  }
});

export default videoProcessingQueue;
