"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDirectory = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function clearDirectory(directoryPath) {
    fs_1.default.readdir(directoryPath, function (err, files) {
        if (err)
            throw err;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            fs_1.default.unlink(path_1.default.join(directoryPath, file), function (err) {
                if (err)
                    throw err;
            });
        }
    });
}
exports.clearDirectory = clearDirectory;
