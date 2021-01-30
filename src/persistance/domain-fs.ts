import {
  DATABASE_FOLDER_NAME_KEY,
  GRAPH_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
} from "../constants";
import { promises as fs } from "fs";

export default class DomainFs {
  private async makeDirIfNotExists(folderLocation: string): Promise<boolean> {
    const stat = await fs.stat(folderLocation);
    if (!stat.isDirectory()) {
      await fs.mkdir(folderLocation);
    }
    return Promise.resolve(true);
  }

  private databaseDirRoot = `${process.env[ROOT_DIRECTORY_PATH_KEY]}/${process.env[DATABASE_FOLDER_NAME_KEY]}`;
  private graphDirRoot = (dbName: string) =>
    `${this.databaseDirLocation(dbName)}/${process.env[GRAPH_FOLDER_NAME_KEY]}`;
  private databaseDirLocation = (dbName: string) =>
    `${this.databaseDirRoot}/${dbName}`;

  private graphDirLocation = (dbName: string, graphName: string) => {
    return `${this.graphDirRoot(dbName)}/${graphName}`;
  };

  createDB = (dbName: string): Promise<boolean> =>
    this.makeDirIfNotExists(this.databaseDirLocation(dbName));

  createGraph = (dbName: string, graphName: string): Promise<boolean> =>
    this.makeDirIfNotExists(this.graphDirLocation(dbName, graphName));

  fetchDBs = (): Promise<string[]> => fs.readdir(this.databaseDirRoot);
}
