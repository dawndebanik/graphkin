import utils from "../fs-utils";
import {
  DATABASE_FOLDER_NAME_KEY,
  FILE_EXTENSION,
  GRAPH_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
  TYPES_FOLDER_NAME_KEY,
  TYPES_NODE_ID_KEY,
} from "../../constants";
import Node from "../../models/node";

export default class DomainFs {
  private databaseDirRoot = `${process.env[ROOT_DIRECTORY_PATH_KEY]}/${process.env[DATABASE_FOLDER_NAME_KEY]}`;

  private databaseDirLocation = (dbName: string): string =>
    `${this.databaseDirRoot}/${dbName}`;

  private graphDirRoot = (dbName: string): string =>
    `${this.databaseDirLocation(dbName)}/${process.env[GRAPH_FOLDER_NAME_KEY]}`;

  private graphDirLocation = (dbName: string, graphName: string): string => {
    return `${this.graphDirRoot(dbName)}/${graphName}`;
  };
  private typesDirLocation = (dbName: string, graphName: string): string => {
    return `${this.graphDirLocation(dbName, graphName)}/${
      process.env[TYPES_FOLDER_NAME_KEY]
    }`;
  };

  createDB = (dbName: string): Promise<boolean> =>
    utils.makeDirIfNotExists(this.databaseDirLocation(dbName));

  createGraph = (dbName: string, graphName: string): Promise<boolean> =>
    utils.makeDirIfNotExists(this.graphDirLocation(dbName, graphName));

  fetchDBs = (): Promise<string[]> =>
    utils.readDirIfExists(this.databaseDirRoot);

  createNode = async (
    node: Node,
    dbName: string,
    graphName: string
  ): Promise<boolean> => {
    try {
      const typeFileLocation = `${this.typesDirLocation(dbName, graphName)}/
    ${process.env[TYPES_FOLDER_NAME_KEY]}/${node.type}.${FILE_EXTENSION}`;
      const content = JSON.parse(
        await utils.readFileIfExists(typeFileLocation)
      );
      const nodeIds: number[] = content[TYPES_NODE_ID_KEY];
      nodeIds.push(node.id);
      content[TYPES_NODE_ID_KEY] = nodeIds;
      await utils.createFile(typeFileLocation, content);
      const nodeFileLocation = `${this.graphDirLocation(dbName, graphName)}/${
        node.id
      }.${FILE_EXTENSION}`;
      await utils.createFile(nodeFileLocation, node);
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
