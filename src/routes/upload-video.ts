import { Router } from "express";
import videoProcessingQueue from "../bull";
import { upload } from "../storage";

const router = Router();

router.post("/api/upload-video", upload.array("videos", 200), (req, res) => {
  const chatId = req.body.chatId;
  const text = req.body.text;
  const fontName = req.body.fontName;
  (req.files as Express.Multer.File[]).forEach((file) => {
    videoProcessingQueue.add({
      inputPath: file.path,
      outputPath: `src/data/${file.filename}`,
      text,
      chatId,
      fontName,
    });
  });

  res.send("Видео приняты и будут обработаны.");
});

export default router;
