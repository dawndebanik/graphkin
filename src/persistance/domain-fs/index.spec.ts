import DomainFs from ".";
import utils from "../fs-utils";
import {
  DATABASE_FOLDER_NAME_KEY,
  GRAPH_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
  TYPES_FOLDER_NAME_KEY,
} from "../../constants";
import Node from "../../models/node";
import Relationship from "../../models/relationship";

describe("Domain Fs", () => {
  process.env[ROOT_DIRECTORY_PATH_KEY] = "root";
  process.env[DATABASE_FOLDER_NAME_KEY] = "databases";
  process.env[GRAPH_FOLDER_NAME_KEY] = "graphs";
  process.env[TYPES_FOLDER_NAME_KEY] = "types";
  const domainFs = new DomainFs();

  it("should create db when it doesn't exist", async () => {
    utils.makeDirIfNotExists = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    const response = await domainFs.createDB("my-social-network");

    expect(response).toBe(true);
    expect(utils.makeDirIfNotExists).toHaveBeenCalledWith(
      "root/databases/my-social-network"
    );
  });

  it("should create graph when it doesn't exist", async () => {
    utils.makeDirIfNotExists = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    const response = await domainFs.createGraph(
      "my-social-network",
      "new-york"
    );

    expect(response).toBe(true);
    expect(utils.makeDirIfNotExists).toHaveBeenCalledWith(
      "root/databases/my-social-network/graphs/new-york"
    );
  });

  it("should fetch alls dbs", async () => {
    utils.readDirIfExists = jest
      .fn()
      .mockImplementation(() => Promise.resolve(["DB1"]));

    const response = await domainFs.fetchDBs();

    expect(response).toStrictEqual(["DB1"]);
    expect(utils.readDirIfExists).toHaveBeenCalledWith("root/databases");
  });
  it("should create a node and append to types file", async () => {
    utils.readFileIfExists = jest.fn().mockImplementation(() =>
      Promise.resolve({
        nodeIds: [3, 4, 5, 6],
      })
    );
    utils.createFile = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    const node = new Node(1, "Person", [], {
      name: "Paula",
    });
    const response = await domainFs.createNode(
      node,
      "MySocialNetwork",
      "California"
    );
    expect(response).toBe(true);
    expect(utils.readFileIfExists).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/graphs/California/types/Person.json"
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/graphs/California/1.json",
      node
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/graphs/California/types/Person.json",
      {
        nodeIds: [3, 4, 5, 6, 1],
      }
    );
  });
  it("should create a node and make new types file", async () => {
    utils.readFileIfExists = jest
      .fn()
      .mockImplementation(() => Promise.resolve(undefined));
    utils.createFile = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    const node = new Node(1, "Person", [], {
      name: "Paula",
    });
    const response = await domainFs.createNode(
      node,
      "MySocialNetwork",
      "California"
    );
    expect(response).toBe(true);
    expect(utils.readFileIfExists).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/graphs/California/types/Person.json"
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/graphs/California/types/Person.json",
      {
        nodeIds: [1],
      }
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/graphs/California/1.json",
      node
    );
  });

  it("should create a relationship and append to types file", async () => {
    utils.readFileIfExists = jest.fn().mockImplementation(() =>
      Promise.resolve({
        relationshipIds: [3, 4, 5, 6],
      })
    );
    utils.createFile = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    const relationship = new Relationship(42, "IsFriendOf", 10, 20, {});

    const response = await domainFs.createRelationship(
      relationship,
      "MySocialNetwork"
    );

    expect(response).toBe(true);
    expect(utils.readFileIfExists).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/relationships/types/IsFriendOf.json"
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/relationships/42.json",
      relationship
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/relationships/types/IsFriendOf.json",
      {
        relationshipIds: [3, 4, 5, 6, 42],
      }
    );
  });

  it("should create a relationship and make new types file", async () => {
    utils.readFileIfExists = jest
      .fn()
      .mockImplementation(() => Promise.resolve(undefined));
    utils.createFile = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    const relationship = new Relationship(42, "IsFriendOf", 1, 2);

    const response = await domainFs.createRelationship(
      relationship,
      "MySocialNetwork"
    );

    expect(response).toBe(true);
    expect(utils.readFileIfExists).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/relationships/types/IsFriendOf.json"
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/relationships/types/IsFriendOf.json",
      {
        relationshipIds: [42],
      }
    );
    expect(utils.createFile).toHaveBeenCalledWith(
      "root/databases/MySocialNetwork/relationships/42.json",
      relationship
    );
  });
});
