import ffmpeg from "fluent-ffmpeg";

export const addTextToVideo = (
  inputPath: string,
  outputPath: string,
  text: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    return ffmpeg(inputPath)
      .output(outputPath)
      .videoFilters([
        {
          filter: "drawtext",
          options: {
            fontfile: "./font/Roboto-Medium.ttf",
            text,
            fontsize: 24,
            fontcolor: "red",
            x: "(main_w/2-text_w/2)",
            y: "(main_h/2-text_h/2)",
            shadowcolor: "black",
            shadowx: 2,
            shadowy: 2,
          },
        },
      ])
      .on("end", () => {
        console.log("Наложение текста завершено.");
        resolve();
      })
      .on("error", (err: unknown) => {
        console.error("Ошибка при наложении текста: ", err);
        reject(err);
      })
      .run();
  });
};
