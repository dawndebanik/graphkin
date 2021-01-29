import PersistenceWriter from "../../src/persistance/persistence-writer";
import fs from "fs";
import {
  DATABASE_FOLDER_NAME_KEY,
  GRAPH_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
} from "../../src/constants";

jest.mock("fs");
describe("Persistence Writer", () => {
  process.env[ROOT_DIRECTORY_PATH_KEY] = "root";
  process.env[DATABASE_FOLDER_NAME_KEY] = "databases";
  process.env[GRAPH_FOLDER_NAME_KEY] = "graphs";
  const writer = new PersistenceWriter();

  const stubFs = (methodName: string, impl?: (arg0: any) => unknown) => {
    fs.promises = {
      ...fs.promises,
      [methodName]: jest.fn().mockImplementation(impl),
    };
  };
  const notADir = { isDirectory: () => false };
  const isADir = { isDirectory: () => true };

  describe("persist db", () => {
    it("should create db when it doesn't exist", async () => {
      stubFs("stat", () => Promise.resolve(notADir));
      stubFs("mkdir", () => Promise.resolve());

      const response = await writer.createDB("my-social-network");

      expect(response).toBe(true);
      expect(fs.promises.mkdir).toHaveBeenCalledWith(
        "root/databases/my-social-network"
      );
    });

    it("should not overwrite db if it exists", async () => {
      stubFs("stat", () => Promise.resolve(isADir));
      stubFs("mkdir");

      const response = await writer.createDB("my-social-network");

      expect(response).toBe(true);
      expect(fs.promises.mkdir).not.toHaveBeenCalled();
    });

    it("should throw if creation fails", async () => {
      stubFs("stat", () => Promise.resolve(notADir));
      stubFs("mkdir", () => Promise.reject("BOOM!"));

      expect(writer.createDB("my-social-network")).rejects.toEqual("BOOM!");
    });
  });

  describe("persist graph", () => {
    it("should create graph when it doesn't exist", async () => {
      stubFs("stat", () => Promise.resolve(notADir));
      stubFs("mkdir", () => Promise.resolve());

      const response = await writer.createGraph(
        "my-social-network",
        "new-york"
      );

      expect(response).toBe(true);
      expect(fs.promises.mkdir).toHaveBeenCalledWith(
        "root/databases/my-social-network/graphs/new-york"
      );
    });

    it("should not overwrite graph if it exists", async () => {
      stubFs("stat", () => Promise.resolve(isADir));
      stubFs("mkdir");

      const response = await writer.createGraph(
        "my-social-network",
        "califronia"
      );

      expect(response).toBe(true);
      expect(fs.promises.mkdir).not.toHaveBeenCalled();
    });

    it("should throw if creation fails", async () => {
      stubFs("stat", () => Promise.resolve(notADir));
      stubFs("mkdir", () => Promise.reject("BOOM!"));

      expect(
        writer.createGraph("my-social-network", "california")
      ).rejects.toEqual("BOOM!");
    });
  });
});
