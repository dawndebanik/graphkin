import Database from "../../src/models/database";
import { testDatabase, testGraph } from "./helpers";

describe("Database Model", () => {
  it("should generate proper metadata for empty database", () => {
    const db = new Database(42, "very-important-db");
    const metadata = db.metadata();

    expect(metadata).toEqual({
      id: 42,
      type: "database",
      data: {
        name: "very-important-db",
        graphIds: [],
      },
    });
  });
  it("should generate proper metadata for database with one graph with id 0", () => {
    const db = testDatabase({ id: 42 });
    const metadata = db.metadata();

    expect(metadata).toEqual({
      id: 42,
      type: "database",
      data: {
        name: "test",
        graphIds: [0],
      },
    });
  });
  it("should generate proper metadata for database with 3 graphs with ids 1, 2, 3", () => {
    const graphWithId1 = testGraph({ id: 1 });
    const graphWithId2 = testGraph({ id: 2 });
    const graphWithId3 = testGraph({ id: 3 });

    const db = testDatabase({
      id: 42,
      name: "db-with-3-graphs",
      graphs: [graphWithId1, graphWithId2, graphWithId3],
    });
    const metadata = db.metadata();

    expect(metadata).toEqual({
      id: 42,
      type: "database",
      data: {
        name: "db-with-3-graphs",
        graphIds: [1, 2, 3],
      },
    });
  });
});
