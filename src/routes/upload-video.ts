import { Router } from "express";
import videoProcessingQueue from "../bull";
import { upload } from "../storage";
// import { addTextToVideo } from "../lib/utils/add-text-to-video";

const router = Router();

router.post("/upload-video", upload.array("videos", 200), (req, res) => {
  const chatId = req.body.chatId;
  (req.files as Express.Multer.File[]).forEach((file) => {
    console.log("Добавляю в очередь");
    videoProcessingQueue.add({
      inputPath: file.path,
      outputPath: `src/data/${file.filename}`,
      text: "Текст для всех видео",
      chatId: chatId,
    });
  });

  res.send("Видео приняты и будут обработаны.");
});

export default router;
