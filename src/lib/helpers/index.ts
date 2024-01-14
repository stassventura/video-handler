import fs from "fs";
import path from "path";

export function clearDirectory(directoryPath: string) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directoryPath, file), (err) => {
        if (err) throw err;
      });
    }
  });
}
