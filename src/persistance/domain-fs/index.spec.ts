import DomainFs from ".";
import utils from "../fs-utils";
import {
  DATABASE_FOLDER_NAME_KEY,
  GRAPH_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
} from "../../constants";

describe("Domain Fs", () => {
  process.env[ROOT_DIRECTORY_PATH_KEY] = "root";
  process.env[DATABASE_FOLDER_NAME_KEY] = "databases";
  process.env[GRAPH_FOLDER_NAME_KEY] = "graphs";
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
});
