"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTextToVideo = void 0;
var fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var split_text_1 = __importDefault(require("./split-text"));
var addTextToVideo = function (inputPath, outputPath, text, fontName, fontSize, lineHeight) {
    if (fontSize === void 0) { fontSize = 32; }
    if (lineHeight === void 0) { lineHeight = 25; }
    return new Promise(function (resolve, reject) {
        fluent_ffmpeg_1.default.ffprobe(inputPath, function (err, metadata) {
            if (err) {
                return reject(new Error("Ошибка при получении информации о видео: " + err.message));
            }
            var videoStream = metadata.streams.find(function (stream) { return stream.codec_type === "video"; });
            if (!videoStream || !videoStream.height) {
                return reject(new Error("Видеопоток не найден или не содержит информации о высоте"));
            }
            var videoHeight = videoStream.height;
            var lines = (0, split_text_1.default)(text, 40);
            var totalTextHeight = lines.length * lineHeight;
            var startY = (videoHeight - totalTextHeight) / 2;
            var videoFilters = lines.map(function (line, index) {
                var escapedLine = line.replace(/:/g, "\\\\:");
                return {
                    filter: "drawtext",
                    options: {
                        fontfile: "src/fonts/".concat(fontName, ".ttf"),
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
            (0, fluent_ffmpeg_1.default)(inputPath)
                .output(outputPath)
                .videoFilters(videoFilters)
                .on("end", function () {
                resolve();
            })
                .on("error", function (err) {
                console.error("Ошибка при наложении текста: ", err);
                reject(err);
            })
                .run();
        });
    });
};
exports.addTextToVideo = addTextToVideo;
