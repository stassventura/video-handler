"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var upload_video_1 = __importDefault(require("./routes/upload-video"));
var status_info_1 = __importDefault(require("./routes/status-info"));
var clear_tasks_1 = __importDefault(require("./routes/clear-tasks"));
var bot_1 = __importDefault(require("./bot"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(upload_video_1.default);
app.use(status_info_1.default);
app.use(clear_tasks_1.default);
app.use("/data", express_1.default.static("src/data"));
bot_1.default.launch();
app.listen(3000, function () {
    console.log("Application started on port 3000!");
});
