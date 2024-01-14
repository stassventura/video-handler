import { Router } from "express";
import { Request, Response } from "express";
import videoProcessingQueue from "../bull";

const router = Router();

router.get("/api/status-info", async (req: Request, res: Response) => {
  try {
    const active = await videoProcessingQueue.getActive();
    const waiting = await videoProcessingQueue.getWaiting();
    const completed = await videoProcessingQueue.getCompleted();
    const failed = await videoProcessingQueue.getFailed();

    res.json({
      active: active.length,
      waiting: waiting.length,
      completed: completed.length,
      failed: failed.length,
    });
  } catch (err) {
    res
      .status(500)
      .send("Ошибка при получении информации об очереди: " + err.message);
  }
});

export default router;
