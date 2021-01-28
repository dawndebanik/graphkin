import {
  DATABASE_FOLDER_NAME_KEY,
  FILE_EXTENSION,
  GRAPH_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
  TYPES_FOLDER_NAME_KEY,
} from "../constants";
import Node from "./../models/node";
import Database from "../models/database";
import Graph from "../models/graph";
import fs from "fs";

export default class PersistenceWriter {
  _makeFolder(folderLocation: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      fs.stat(folderLocation, (err, stat) => {
        if (err) {
          reject(err);
        } else if (!stat.isDirectory()) {
          fs.mkdir(folderLocation, { recursive: true }, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      });
    });
  }

  _writeFile(location: string, data: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      fs.writeFile(location, data, "utf-8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  writeDB(dbName: string): Promise<unknown> {
    const databaseFolderLocation =
      process.env[ROOT_DIRECTORY_PATH_KEY] +
      "/" +
      process.env[DATABASE_FOLDER_NAME_KEY] +
      "/" +
      dbName;
    return this._makeFolder(databaseFolderLocation);
  }

  createGraph(graphName: string, databaseName: string): Promise<unknown> {
    const graphFolderLocation =
      process.env[ROOT_DIRECTORY_PATH_KEY] +
      "/" +
      process.env[DATABASE_FOLDER_NAME_KEY] +
      "/" +
      databaseName +
      "/" +
      process.env[GRAPH_FOLDER_NAME_KEY] +
      "/" +
      graphName;
    return this._makeFolder(graphFolderLocation);
  }

  createNode(node: Node, database: Database, graph: Graph): Promise<unknown> {
    const fileName = node.id + FILE_EXTENSION;
    const fileLocation =
      process.env[ROOT_DIRECTORY_PATH_KEY] +
      "/" +
      process.env[DATABASE_FOLDER_NAME_KEY] +
      "/" +
      database.name +
      "/" +
      process.env[GRAPH_FOLDER_NAME_KEY] +
      "/" +
      graph.name;
    const type = node.type;
    const typeFileLocation =
      fileLocation +
      "/" +
      process.env[TYPES_FOLDER_NAME_KEY] +
      "/" +
      type +
      FILE_EXTENSION;
    //TODO: Write the types file.
    return this._writeFile(fileLocation + fileName, JSON.stringify(node));
  }
}
