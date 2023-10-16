import type { DefaultTheme } from "vitepress";
import path from "path";
import fs from "fs";

const ignoreDir = ["public", "assets", "about"];

const getFolders = (dir: string) =>
  fs.readdirSync(dir).filter((p) => {
    const folders = fs.statSync(path.resolve(dir, p));
    return (
      !ignoreDir.includes(p) && folders.isDirectory() && !p.startsWith(".")
    );
  });

function generateNavConfig(): DefaultTheme.NavItem[] {
  const root = "/docs";
  const navList: DefaultTheme.NavItem[] = [{ text: "Home", link: "/" }];
  const dirs = getFolders("." + root);
  dirs.forEach((dir) => {
    const items = getNavFromDir("." + root + "/" + dir, dir);

    navList.push({
      text: dir.slice(0, 1).toUpperCase() + dir.slice(1),
      items: items.length ? items : (undefined as any),
      link: !items.length ? "/" + dir + "/" : undefined,
    });
  });

  navList.push({
    text: "About",
    link: "/about/",
  });

  return navList;
}

function getNavFromDir(
  folderPath: string,
  prefix: string
): DefaultTheme.NavItemWithLink[] {
  const dirs = getFolders(folderPath);
  const navList: DefaultTheme.NavItemWithLink[] = [];

  dirs.forEach((dir) => {
    navList.push({
      text: dir.toUpperCase(),
      link: prefix + "/" + dir + "/",
    });
  });

  return navList;
}

export const nav: DefaultTheme.NavItem[] = generateNavConfig();
