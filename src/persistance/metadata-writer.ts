import { Metadata } from "../metadata/MetadataGenerable";
import { META_DATA_PATH_KEY } from "../constants";
import fs from "fs";

export default class MetadataWriter {
  writeMetadata(metaData: Metadata): void {
    const fileName: string = metaData.id + ".dat";
    const fileLocation =
      process.env[META_DATA_PATH_KEY] + metaData.type + "/" + fileName;

    fs.writeFileSync(fileLocation, JSON.stringify(metaData.data), "utf-8");
  }
}
