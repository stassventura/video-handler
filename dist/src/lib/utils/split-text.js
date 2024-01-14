"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitText(text, maxLineLength) {
    var paragraphs = text.split("\n");
    var lines = [];
    paragraphs.forEach(function (paragraph) {
        var words = paragraph.split(" ");
        var currentLine = words[0] || "";
        for (var i = 1; i < words.length; i++) {
            if (currentLine.length + words[i].length + 1 <= maxLineLength) {
                currentLine += " " + words[i];
            }
            else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
        lines.push("");
    });
    if (lines[lines.length - 1] === "") {
        lines.pop();
    }
    return lines;
}
exports.default = splitText;
