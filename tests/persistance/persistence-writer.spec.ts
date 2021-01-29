import PersistenceWriter from "../../src/persistance/persistence-writer";
import fs from "fs";
import {
  DATABASE_FOLDER_NAME_KEY,
  ROOT_DIRECTORY_PATH_KEY,
} from "../../src/constants";

jest.mock("fs");
describe("Persistence Writer", () => {
  process.env[ROOT_DIRECTORY_PATH_KEY] = "root";
  process.env[DATABASE_FOLDER_NAME_KEY] = "databases";
  it("should create db when it doesn't exist", async () => {
    const mockStat = {
      isDirectory: () => false,
    };
    fs.promises = {
      ...fs.promises,
      stat: jest.fn().mockImplementation(() => Promise.resolve(mockStat)),
      mkdir: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    const writer = new PersistenceWriter();

    const response = await writer.createDB("my-social-network");

    expect(response).toBe(true);
    expect(fs.promises.mkdir).toHaveBeenCalledWith(
      "root/databases/my-social-network"
    );
  });

  it("should not overwrite db if it exists", async () => {
    const mockStat = {
      isDirectory: () => true,
    };
    fs.promises = {
      ...fs.promises,
      stat: jest.fn().mockImplementation(() => Promise.resolve(mockStat)),
      mkdir: jest.fn(),
    };
    const writer = new PersistenceWriter();

    const response = await writer.createDB("my-social-network");

    expect(response).toBe(true);
    expect(fs.promises.mkdir).not.toHaveBeenCalled();
  });

  it("should throw if creation fails", async () => {
    const mockStat = {
      isDirectory: () => false,
    };
    fs.promises = {
      ...fs.promises,
      stat: jest.fn().mockImplementation(() => Promise.resolve(mockStat)),
      mkdir: jest.fn().mockImplementation(() => Promise.reject("BOOM!")),
    };
    const writer = new PersistenceWriter();
    expect(writer.createDB("my-social-network")).rejects.toEqual("BOOM!");
  });
});
