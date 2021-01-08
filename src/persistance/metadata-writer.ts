import { Metadata } from "../metadata/MetadataGenerable";
import { META_DATA_PATH_KEY } from "../constants";

export default class MetadataWriter {
  private _fs: any;

  constructor(fs: any) {
    this._fs = fs;
  }

  writeMetadata(metaData: Metadata): void {
    const fileName: string = metaData.id + ".dat";
    const fileLocation =
      process.env[META_DATA_PATH_KEY] + metaData.type + "/" + fileName;
    this._fs.writeFileSync(
      fileLocation,
      JSON.stringify(metaData.data),
      "utf-8"
    );
  }
}
