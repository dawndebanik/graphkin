import { Metadata } from "../metadata/MetadataGenerable";
import { META_DATA_LOCATION } from "../constants";

export default class MetadataWriter {
  private _fs: any;

  constructor(fs: any) {
    this._fs = fs;
  }

  writeMetadata(metaData: Metadata) {
    const fileName: string = metaData.type + ".dat";
    const fileLocation = META_DATA_LOCATION + "/" + fileName;
    this._fs.writeFileSync(
      fileLocation,
      JSON.stringify(metaData.data),
      "utf-8"
    );
  }
}
