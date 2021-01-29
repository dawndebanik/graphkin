import {
  DATABASE_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
} from "../constants";
import { promises as fs } from "fs";

export default class PersistenceWriter {
  private async makeFolder(folderLocation: string): Promise<boolean> {
    const stat = await fs.stat(folderLocation);
    if (stat.isDirectory()) {
      return Promise.resolve(true);
    }
    try {
      await fs.mkdir(folderLocation);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  createDB(dbName: string): Promise<boolean> {
    const databaseFolderLocation =
      process.env[ROOT_DIRECTORY_PATH_KEY] +
      "/" +
      process.env[DATABASE_FOLDER_NAME_KEY] +
      "/" +
      dbName;
    return this.makeFolder(databaseFolderLocation);
  }
}
