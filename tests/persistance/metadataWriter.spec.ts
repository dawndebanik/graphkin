import MetadataWriter from "../../src/persistance/metadataWriter";
import Node from "../../src/models/node";
import { META_DATA_LOCATION } from "../../src/constants";
import fs from "fs";

jest.mock("fs");

describe("Persistent metadata", () => {
  it("should generate metadata for a node", () => {
    const node = new Node(32);
    const metaData = node.metadata();
    const metadataWriter = new MetadataWriter(fs);
    metadataWriter.writeMetadata(metaData);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      META_DATA_LOCATION + "/" + metaData.type + ".dat",
      JSON.stringify(metaData.data),
      "utf-8"
    );
  });
});
