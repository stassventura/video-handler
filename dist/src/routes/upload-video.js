"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bull_1 = __importDefault(require("../bull"));
var storage_1 = require("../storage");
var router = (0, express_1.Router)();
router.post("/api/upload-video", storage_1.upload.array("videos", 200), function (req, res) {
    var chatId = req.body.chatId;
    var text = req.body.text;
    var fontName = req.body.fontName;
    req.files.forEach(function (file) {
        bull_1.default.add({
            inputPath: file.path,
            outputPath: "src/data/".concat(file.filename),
            text: text,
            chatId: chatId,
            fontName: fontName,
        });
    });
    res.send("Видео приняты и будут обработаны.");
});
exports.default = router;
