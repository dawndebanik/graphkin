import Graph from "../../src/models/graph";
import Node from "../../src/models/node";
import { testGraph } from "../helpers";

describe("Graph Model", () => {
  it("should generate proper metadata for empty graph", () => {
    const graph = new Graph(42, "graph-of-life");

    const metadata = graph.metadata();

    expect(metadata).toEqual({
      type: "graph",
      id: 42,
      data: {
        name: "graph-of-life",
        nodeIds: [],
      },
    });
  });

  it("should generate proper metadata for graph with nodes with ids 1, 2, 3", () => {
    const nodeWithId1 = new Node(1);
    const nodeWithId2 = new Node(2);
    const nodeWithId3 = new Node(3);
    const graph = testGraph({
      id: 42,
      nodes: [nodeWithId1, nodeWithId2, nodeWithId3],
    });

    const metadata = graph.metadata();

    expect(metadata).toEqual({
      type: "graph",
      id: 42,
      data: {
        name: "test",
        nodeIds: [1, 2, 3],
      },
    });
  });
});
