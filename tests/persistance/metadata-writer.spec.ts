import MetadataWriter from "../../src/persistance/metadata-writer";
import Node from "../../src/models/node";
import { META_DATA_PATH_KEY } from "../../src/constants";
import fs from "fs";

jest.mock("fs");

describe("Persistent metadata", () => {
  it("should generate metadata for a node", () => {
    const node = new Node(32);
    const metaData = node.metadata();
    process.env[META_DATA_PATH_KEY] = __dirname + "/metadata/";
    const metadataWriter = new MetadataWriter(fs);
    metadataWriter.writeMetadata(metaData);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      __dirname + "/metadata/" + metaData.type + "/" + metaData.id + ".dat",
      JSON.stringify(metaData.data),
      "utf-8"
    );
  });
});
