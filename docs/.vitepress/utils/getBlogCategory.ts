import fs from "fs";
import path from "path";
export function getBlogCategory() {
  const baseUrl = "./docs/blog";
  const blogDir = path.resolve(".", "./docs/blog");
  const dirs = fs.readdirSync(blogDir);

  // 输出一个 markdown 文件
}
