export default function splitText(
  text: string,
  maxLineLength: number,
): string[] {
  const paragraphs = text.split("\n");
  const lines = [];

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(" ");
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      if (currentLine.length + words[i].length + 1 <= maxLineLength) {
        currentLine += " " + words[i];
      } else {
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
