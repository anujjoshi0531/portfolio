import fs from "fs";
import path from "path";

export const getContentDirectory = () => {
  const primaryPath = path.join(process.cwd(), "content");
  if (fs.existsSync(primaryPath)) {
    try {
      const files = fs.readdirSync(primaryPath);
      if (files.length > 0) return primaryPath;
    } catch {
      // Fall through to the secondary content checkout when the primary path cannot be read.
    }
  }

  const secondaryPath = path.resolve(process.cwd(), "../portfolio-content");
  if (fs.existsSync(secondaryPath)) {
    return secondaryPath;
  }

  return primaryPath;
};
