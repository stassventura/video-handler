import express from "express";
import cors from "cors";
import videoRoutes from "./routes/upload-video";
import statusRoutes from "./routes/status-info";
import clearRoutes from "./routes/clear-tasks";
import bot from "./bot";

const app = express();
app.use(cors());
app.use(express.json());
app.use(videoRoutes);
app.use(statusRoutes);
app.use(clearRoutes);
app.use("/data", express.static("src/data"));

bot.launch();

app.listen(3000, () => {
  console.log(`Application started on port 3000!`);
});
