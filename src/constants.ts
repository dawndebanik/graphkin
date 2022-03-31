export enum Models {
  DATABASE = "database",
  GRAPH = "graph",
  NODE = "node",
  RELATIONSHIP = "relationship",
}

export const ROOT_DIRECTORY_PATH_KEY = "ROOT_DIRECTORY";
export const GRAPH_FOLDER_NAME_KEY = "GRAPH_FOLDER_NAME";
export const DATABASE_FOLDER_NAME_KEY = "DATABASE_FOLDER_NAME";
export const TYPES_FOLDER_NAME_KEY = "TYPES_FOLDER_NAME";

export const FILE_EXTENSION = ".json";

export enum HttpStatusCodes {
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
  CREATED = 201,
  OK_200 = 200,
}
