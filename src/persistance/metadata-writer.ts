import {Metadata} from "../metadata/MetadataGenerable";
import {META_DATA_PATH_KEY} from "../constants";
import fs from "fs";

const DATA_FILE_EXTENSION = "dat";

export default class MetadataWriter {
  writeMetadata(metaData: Metadata): void {
    const metadataRootDir = process.env[META_DATA_PATH_KEY];

    if (metaData.type) {
      const fileName = `${metaData.type}.${DATA_FILE_EXTENSION}`;
      const fileLocation = `${metadataRootDir}/${metaData.modelName}/types/${fileName}`;

      let typeData: number[] = [];
      try {
        fs.accessSync(fileLocation, fs.constants.W_OK | fs.constants.R_OK);
        typeData = JSON.parse(fs.readFileSync(fileLocation, "utf-8"));
      } catch (e) {}

      typeData.push(metaData.id);
      _writeDataToFile(fileLocation, JSON.stringify(typeData));
    }

    const fileName = `${metaData.id}.${DATA_FILE_EXTENSION}`;
    const fileLocation = `${metadataRootDir}/${metaData.modelName}/${fileName}`;
    _writeDataToFile(fileLocation, JSON.stringify(metaData.data));
  }
}

function _writeDataToFile(location: string, data: string): void {
  fs.writeFileSync(location, data, "utf-8");
}
