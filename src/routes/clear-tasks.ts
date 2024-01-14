import { Router } from "express";
import { Request, Response } from "express";
import videoProcessingQueue from "../bull";
import { clearDirectory } from "../lib/helpers";

const router = Router();

router.get("/api/clear", async (req: Request, res: Response) => {
  try {
    await videoProcessingQueue.pause();
    await videoProcessingQueue.clean(50, "active");
    await videoProcessingQueue.clean(50, "wait");
    await videoProcessingQueue.clean(50, "paused");
    await videoProcessingQueue.empty();

    clearDirectory("src/data");
    clearDirectory("src/uploads");

    res.send("Active and waiting tasks have been cleared");
  } catch (error) {
    console.error("Error clearing tasks:", error);
    res.status(500).send("Error occurred while clearing tasks");
  }
});

export default router;
