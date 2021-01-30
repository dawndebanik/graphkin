import utils from "../fs-utils";
import {DATABASE_FOLDER_NAME_KEY, GRAPH_FOLDER_NAME_KEY, ROOT_DIRECTORY_PATH_KEY,} from "../../constants";

export default class DomainFs {
  private databaseDirRoot = `${process.env[ROOT_DIRECTORY_PATH_KEY]}/${process.env[DATABASE_FOLDER_NAME_KEY]}`;

  private databaseDirLocation = (dbName: string): string =>
    `${this.databaseDirRoot}/${dbName}`;

  private graphDirRoot = (dbName: string): string =>
    `${this.databaseDirLocation(dbName)}/${process.env[GRAPH_FOLDER_NAME_KEY]}`;

  private graphDirLocation = (dbName: string, graphName: string): string => {
    return `${this.graphDirRoot(dbName)}/${graphName}`;
  };

  createDB = (dbName: string): Promise<boolean> =>
    utils.makeDirIfNotExists(this.databaseDirLocation(dbName));

  createGraph = (dbName: string, graphName: string): Promise<boolean> =>
    utils.makeDirIfNotExists(this.graphDirLocation(dbName, graphName));

  fetchDBs = (): Promise<string[]> =>
    utils.readDirIfExists(this.databaseDirRoot);

  //createNode = (node: Node, dbName: string): Promise<boolean> => {};
}
