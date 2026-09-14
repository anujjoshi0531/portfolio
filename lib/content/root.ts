import path from "path";

export const getContentDirectory = () => {
  return path.join(process.cwd(), "content");
};
