import {ROOT_DIRECTORY_PATH_KEY} from "../constants";
import fs from "fs";

export default class PersistenceWriter {
  writeDB(dbName: string): void {
    const databaseFolderLocation =
      process.env[ROOT_DIRECTORY_PATH_KEY] + "databases/" + dbName;
    fs.stat(databaseFolderLocation, (err, stat) => {
      if (err || !stat.isDirectory()) {
        fs.mkdir(databaseFolderLocation, { recursive: true }, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
  }
}
