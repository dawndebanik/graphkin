import MetadataWriter from "../../src/persistance/metadata-writer";
import Node from "../../src/models/node";
import { META_DATA_PATH_KEY } from "../../src/constants";
import fs from "fs";

jest.mock("fs");

describe("Persistent metadata", () => {
  it("should generate metadata for a node", () => {
    const node = new Node(32);
    process.env[META_DATA_PATH_KEY] = __dirname + "/metadata/";
    const metadataWriter = new MetadataWriter();

    node.connectTo(node, 5);
    const metaData = node.metadata();
    metadataWriter.writeMetadata(metaData);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      __dirname + "/metadata/node/32.dat",
      '{"relationshipIds":[5]}',
      "utf-8"
    );
  });
});
