import fs from "fs/promises";

export const dirExists = async (dirPath: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) {
      return false;
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    } else {
      throw err;
    }
  }

  return true;
};

export const makeDirIfNotExists = async (
  folderLocation: string
): Promise<boolean> => {
  if (!(await dirExists(folderLocation))) {
    await fs.mkdir(folderLocation, { recursive: true });
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

export const readDirIfExists = async (dirName: string): Promise<string[]> => {
  if (!(await dirExists(dirName))) {
    return [];
  }

  return fs.readdir(dirName);
};

export default {
  dirExists,
  makeDirIfNotExists,
  readDirIfExists,
};
