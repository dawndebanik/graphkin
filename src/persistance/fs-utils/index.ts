import fs from "fs/promises";

const NO_ENTRY = "ENOENT";

export const dirExists = async (dirPath: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) {
      return false;
    }
  } catch (err: any) {
    if (err.code === NO_ENTRY) {
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

export const readFileIfExists = async (
  location: string
): Promise<string | undefined> => {
  try {
    return await fs.readFile(location, "utf-8");
  } catch (e: any) {
    if (e.code === NO_ENTRY) {
      return undefined;
    } else {
      throw e;
    }
  }
};

export const createFile = async (
  location: string,
  fileData: unknown
): Promise<boolean> => {
  await fs.writeFile(location, JSON.stringify(fileData), "utf-8");
  return true;
};

export default {
  dirExists,
  makeDirIfNotExists,
  readDirIfExists,
  readFileIfExists,
  createFile,
};
