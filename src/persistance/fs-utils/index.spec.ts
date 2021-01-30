import fs from "fs/promises";
import utils, {dirExists, makeDirIfNotExists, readDirIfExists} from ".";

jest.mock("fs/promises");

describe("File system utils", () => {
  const stubFs = (
    methodName: keyof typeof fs,
    impl?: (arg0: any) => unknown
  ) => {
    fs[methodName] = jest.fn().mockImplementation(impl);
  };
  const notADir = { isDirectory: () => false };
  const isADir = { isDirectory: () => true };

  describe("Directory exists?", () => {
    it("should return false if doesn't exist at all", async () => {
      stubFs("stat", () => Promise.reject({ code: "ENOENT" }));

      expect(await utils.dirExists("non-existent-dir")).toBe(false);
    });

    it("should return false if not a directory", async () => {
      stubFs("stat", () => Promise.resolve(notADir));

      expect(await dirExists("a-file")).toBe(false);
    });

    it("should return true otherwise", async () => {
      stubFs("stat", () => Promise.resolve(isADir));

      expect(await dirExists("a-dir")).toBe(true);
    });

    it("should throw error for other errors", async () => {
      stubFs("stat", () => Promise.reject({ code: "SOMETHING_BAD" }));

      await expect(dirExists("a-dir")).rejects.toEqual({
        code: "SOMETHING_BAD",
      });
    });
  });

  describe("Make directory", () => {
    it("should make dir if doesn't exist", async () => {
      stubFs("stat", () => Promise.reject({ code: "ENOENT" }));
      stubFs("mkdir");

      expect(await makeDirIfNotExists("root/non-existent-dir")).toBe(true);
      expect(fs.mkdir).toHaveBeenCalledWith("root/non-existent-dir", {
        recursive: true,
      });
    });

    it("should not do anything if dir exists", async () => {
      stubFs("stat", () => Promise.resolve(isADir));
      stubFs("mkdir");

      expect(await makeDirIfNotExists("root/non-existent-dir")).toBe(false);
      expect(fs.mkdir).not.toHaveBeenCalled();
    });
  });

  describe("Read directory", () => {
    it("should return empty array if dir doesn't exist", async () => {
      stubFs("stat", () => Promise.reject({ code: "ENOENT" }));

      expect(await readDirIfExists("non-existent-dir")).toStrictEqual([]);
    });

    it("should return file names in dir otherwise", async () => {
      stubFs("stat", () => Promise.resolve(isADir));
      stubFs("readdir", () => Promise.resolve(["DB1, DB2"]));

      expect(await readDirIfExists("non-existent-dir")).toStrictEqual([
        "DB1, DB2",
      ]);
    });
  });
  describe("Should read a file", () => {
    it("should read a file and return the contents of the file", async () => {
      stubFs("readFile", () => Promise.resolve({ nodeIds: [3, 4, 5, 6] }));
      expect(await utils.readFileIfExists("Person.json")).toStrictEqual({
        nodeIds: [3, 4, 5, 6],
      });
    });
    it("should read a file and return empty object if file not exists", async () => {
      stubFs("readFile", () => Promise.reject({}));
      expect(await utils.readFileIfExists("Person.json")).toStrictEqual({});
    });
  });
});
