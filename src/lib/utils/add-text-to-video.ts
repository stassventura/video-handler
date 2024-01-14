import ffmpeg from "fluent-ffmpeg";
import splitText from "./split-text";

export const addTextToVideo = (
  inputPath: string,
  outputPath: string,
  text: string,
  fontName: string,
  fontSize: number = 32,
  lineHeight: number = 25,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err) {
        return reject(
          new Error("Ошибка при получении информации о видео: " + err.message),
        );
      }
      const videoStream = metadata.streams.find(
        (stream) => stream.codec_type === "video",
      );
      if (!videoStream || !videoStream.height) {
        return reject(
          new Error("Видеопоток не найден или не содержит информации о высоте"),
        );
      }
      const videoHeight = videoStream.height;
      const lines = splitText(text, 40);
      const totalTextHeight = lines.length * lineHeight;
      const startY = (videoHeight - totalTextHeight) / 2;

      const videoFilters = lines.map((line, index) => {
        const escapedLine = line.replace(/:/g, "\\\\:");
        return {
          filter: "drawtext",
          options: {
            fontfile: `src/fonts/${fontName}.ttf`,
            text: escapedLine,
            fontsize: fontSize,
            fontcolor: "white",
            x: "(main_w/2-text_w/2)",
            y: startY + index * lineHeight,
            shadowcolor: "black",
            shadowx: 2,
            shadowy: 2,
          },
        };
      });

      ffmpeg(inputPath)
        .output(outputPath)
        .videoFilters(videoFilters)
        .on("end", () => {
          resolve();
        })
        .on("error", (err: unknown) => {
          console.error("Ошибка при наложении текста: ", err);
          reject(err);
        })
        .run();
    });
  });
};
