import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import videoRoutes from "./routes/upload-video";
import bot from "./bot";
const app = express();
app.use(cors());
app.use(express.json());
app.use(videoRoutes);
app.use("/data", express.static("src/data"));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

bot.hears("hi", (ctx) =>
  ctx.reply("Hey there!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Кнопка",
            web_app: { url: "https://demo-video-uploader.surge.sh/" },
          },
        ],
      ],
    },
  }),
);

bot.launch();

app.listen(3000, () => {
  console.log(`Application started on port 3000!`);
});
