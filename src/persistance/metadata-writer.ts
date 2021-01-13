import {Metadata} from "../metadata/MetadataGenerable";
import {META_DATA_PATH_KEY} from "../constants";
import fs from "fs";

export default class MetadataWriter {
  writeMetadata(metaData: Metadata): void {
    const fileName: string = metaData.id + ".dat";
    const fileLocation =
      process.env[META_DATA_PATH_KEY] + metaData.modelName + "/" + fileName;
    _writeDataToFile(fileLocation, JSON.stringify(metaData.data));
    const typeFileName = metaData.type + ".dat";
    const typeFileLocation =
      process.env[META_DATA_PATH_KEY] +
      metaData.modelName +
      "/types/" +
      typeFileName;
    //Creating the typeFile.
    if (metaData.type) {
      let typeData: string[] = [];
      if (fs.existsSync(typeFileLocation)) {
        typeData = JSON.parse(fs.readFileSync(typeFileLocation, "utf-8"));
      }
      typeData.push(String(metaData.id));
      _writeDataToFile(typeFileLocation, JSON.stringify(typeData));
    }
  }
}

function _writeDataToFile(location: string, data: string): void {
  fs.writeFileSync(location, data, "utf-8");
}
