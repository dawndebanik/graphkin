import Node from "../../src/models/node";
import Relationship from "../../src/models/relationship";

describe("Node Model", () => {
  it("should generate metadata for a single, unconnected node", () => {
    const node = new Node(42);

    const metadata = node.metadata();

    expect(metadata).toEqual({
      type: "node",
      id: 42,
      data: {
        relationshipIds: [],
      },
    });
  });

  it("should generate metadata for a node having relationships with ids 1, 2, 3", () => {
    const node = new Node(42);
    node.connectTo(node, 1);
    node.connectTo(node, 2);
    node.connectTo(node, 3);

    const metadata = node.metadata();

    expect(metadata).toEqual({
      type: "node",
      id: 42,
      data: {
        relationshipIds: [1, 2, 3],
      },
    });
  });

  it("should connect to another node which is not this node", () => {
    const node = new Node(1);
    const other = new Node(2);

    node.connectTo(other, 0);

    expect(node.relationships).toContainEqual(new Relationship(0, node, other));
    expect(node.relationships.length).toBe(1);
    expect(other.relationships).toContainEqual(
      new Relationship(0, node, other)
    );
    expect(other.relationships.length).toBe(1);
  });
  it("should connect to itself", () => {
    const node = new Node(1);

    node.connectTo(node, 0);

    expect(node.relationships).toContainEqual(new Relationship(0, node, node));
    expect(node.relationships.length).toBe(1);
  });

  it("should generate core data stored in the node", () => {
    const coreData = {
      to: "be",
      or: "not",
    };

    const actualCoreData = new Node(42, undefined, coreData).coreData();

    expect(actualCoreData).toEqual({
      type: "node",
      id: 42,
      data: coreData,
    });
  });
});
