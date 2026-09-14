import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "content", "_assets");
const output = path.join(root, "public", "_assets");
const extensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg", ".ico", ".pdf", ".mp3", ".mp4", ".webm", ".ogg", ".wav", ".vtt"]);

function files(directory, relative = "") {
  return readdirSync(path.join(directory, relative), { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || entry.isSymbolicLink()) return [];
    const name = path.join(relative, entry.name);
    return entry.isDirectory() ? files(directory, name) : [name];
  });
}

// Fail before touching output if the source checkout is missing.
const assets = new Set(files(source).filter((name) => extensions.has(path.extname(name).toLowerCase())));
mkdirSync(output, { recursive: true });
let copied = 0;
for (const name of assets) {
  const from = path.join(source, name);
  const to = path.join(output, name);
  if (existsSync(to) && readFileSync(from).equals(readFileSync(to))) continue;
  mkdirSync(path.dirname(to), { recursive: true });
  copyFileSync(from, to);
  copied++;
}
let removed = 0;
for (const name of files(output)) {
  if (assets.has(name)) continue;
  rmSync(path.join(output, name));
  removed++;
}
console.log(`Content assets: ${assets.size} available, ${copied} copied, ${removed} stale files removed.`);
