import utils from "../fs-utils";
import {
  DATABASE_FOLDER_NAME_KEY,
  FILE_EXTENSION,
  GRAPH_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
  TYPES_FOLDER_NAME_KEY,
} from "../../constants";
import Node from "../../models/node";
import Relationship from "../../models/relationship";
import {
  NodeTypeFileContent,
  RelationshipTypeFileContent,
} from "../../types/persistence";
import "dotenv/config";

// TODO: use default fallback values for env variables if not set

export default class DomainFs {
  private databaseDirRoot = `${process.env[ROOT_DIRECTORY_PATH_KEY]}/${process.env[DATABASE_FOLDER_NAME_KEY]}`;

  private getDatabaseDirLocation = (dbName: string): string =>
    `${this.databaseDirRoot}/${dbName}`;

  private getGraphDirRoot = (dbName: string): string =>
    `${this.getDatabaseDirLocation(dbName)}/${
      process.env[GRAPH_FOLDER_NAME_KEY]
    }`;

  private getGraphDirLocation = (dbName: string, graphName: string): string => {
    return `${this.getGraphDirRoot(dbName)}/${graphName}`;
  };
  private getTypesDirLocation = (dbName: string, graphName: string): string => {
    return `${this.getGraphDirLocation(dbName, graphName)}/${
      process.env[TYPES_FOLDER_NAME_KEY]
    }`;
  };

  createDBIfNotExists = (dbName: string): Promise<boolean> =>
    utils.makeDirIfNotExists(this.getDatabaseDirLocation(dbName));

  createGraphIfNotExists = (
    dbName: string,
    graphName: string
  ): Promise<boolean> =>
    utils.makeDirIfNotExists(this.getGraphDirLocation(dbName, graphName));

  fetchDBList = (): Promise<string[]> =>
    utils.readDirIfExists(this.databaseDirRoot);

  createNode = async (
    node: Node,
    dbName: string,
    graphName: string
  ): Promise<boolean> => {
    const typesFilePath = `${this.getTypesDirLocation(dbName, graphName)}/${
      node.type
    }${FILE_EXTENSION}`;
    const nodeFilePath = `${this.getGraphDirLocation(dbName, graphName)}/${
      node.id
    }${FILE_EXTENSION}`;

    let fileContent: NodeTypeFileContent;
    const fileContentString: string | undefined = JSON.stringify(
      await utils.readFileIfExists(typesFilePath)
    );

    if (fileContentString) {
      fileContent = JSON.parse(fileContentString);
      fileContent.nodeIds.push(node.id);
    } else {
      fileContent = {
        nodeIds: [node.id],
      };
    }

    await utils.createFile(typesFilePath, fileContent);
    await utils.createFile(nodeFilePath, node);

    return true;
  };

  createRelationship = async (
    relationship: Relationship,
    dbName: string
  ): Promise<boolean> => {
    const relationshipDirRoot = `${this.getDatabaseDirLocation(
      dbName
    )}/relationships`;
    const relationshipFilePath = `${relationshipDirRoot}/${relationship.id}${FILE_EXTENSION}`;
    const typeFilePath = `${relationshipDirRoot}/types/${relationship.type}${FILE_EXTENSION}`;

    let fileContent: RelationshipTypeFileContent;
    const fileContentString = JSON.stringify(
      await utils.readFileIfExists(typeFilePath)
    );

    if (fileContentString) {
      fileContent = JSON.parse(fileContentString);
      fileContent.relationshipIds.push(relationship.id);
    } else {
      fileContent = {
        relationshipIds: [relationship.id],
      };
    }

    await utils.createFile(relationshipFilePath, relationship);
    await utils.createFile(typeFilePath, fileContent);

    return true;
  };
}
