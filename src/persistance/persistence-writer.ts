import {
  DATABASE_FOLDER_NAME_KEY,
  GRAPH_FOLDER_NAME_KEY,
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

  private databaseDirLocation = (dbName: string) => {
    return `${process.env[ROOT_DIRECTORY_PATH_KEY]}/${process.env[DATABASE_FOLDER_NAME_KEY]}/${dbName}`;
  };

  private graphDirLocation = (dbName: string, graphName: string) => {
    return `${this.databaseDirLocation(dbName)}/${
      process.env[GRAPH_FOLDER_NAME_KEY]
    }/${graphName}`;
  };

  createDB(dbName: string): Promise<boolean> {
    return this.makeFolder(this.databaseDirLocation(dbName));
  }

  createGraph(dbName: string, graphName: string): Promise<boolean> {
    return this.makeFolder(this.graphDirLocation(dbName, graphName));
  }
}
