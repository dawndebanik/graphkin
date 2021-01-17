import MetadataWriter from "../../src/persistance/metadata-writer";
import Node from "../../src/models/node";
import {META_DATA_PATH_KEY} from "../../src/constants";
import fs from "fs";

jest.mock("fs");

describe("Persistent metadata", () => {
  it("should generate metadata for a node with types file not existing.", () => {
    const node = new Node(32, "Person");
    process.env[META_DATA_PATH_KEY] = __dirname + "/metadata";
    const metadataWriter = new MetadataWriter();

    node.connectTo(node, 5);
    const metaData = node.metadata();
    metadataWriter.writeMetadata(metaData);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      __dirname + "/metadata/node/types/Person.dat",
      "[32]",
      "utf-8"
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      __dirname + "/metadata/node/32.dat",
      '{"relationshipIds":[5]}',
      "utf-8"
    );
  });

  it("Should create metadata for a node with types file existing", () => {
    beforeAll(() => {
      fs.writeFileSync(
        __dirname + "/metadata/node/types/Person.dat",
        "[31]",
        "utf-8"
      );
    });
    const node = new Node(32, "Person");
    process.env[META_DATA_PATH_KEY] = __dirname + "/metadata";
    const metadataWriter = new MetadataWriter();
    //making the type file exists.
    node.connectTo(node, 5);
    const metaData = node.metadata();
    metadataWriter.writeMetadata(metaData);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      __dirname + "/metadata/node/types/Person.dat",
      "[31,32]",
      "utf-8"
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      __dirname + "/metadata/node/32.dat",
      '{"relationshipIds":[5]}',
      "utf-8"
    );
  });
});
