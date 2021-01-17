import Node from "../../src/models/node";
import Relationship from "../../src/models/relationship";

describe("Node Model", () => {
  it("should generate metadata for a single, unconnected node", () => {
    const node = new Node(42, "Distance");

    const metadata = node.metadata();

    expect(metadata).toEqual({
      modelName: "node",
      id: 42,
      type: "Distance",
      data: {
        relationshipIds: [],
      },
    });
  });

  it("should generate metadata for a node having relationships with ids 1, 2, 3", () => {
    const node = new Node(42, "Person");
    node.connectTo(node, 1);
    node.connectTo(node, 2);
    node.connectTo(node, 3);

    const metadata = node.metadata();

    expect(metadata).toEqual({
      modelName: "node",
      type: "Person",
      id: 42,
      data: {
        relationshipIds: [1, 2, 3],
      },
    });
  });

  it("should connect to another node which is not this node", () => {
    const node = new Node(1, "Distance");
    const other = new Node(2, "Distance");

    node.connectTo(other, 0);

    expect(node.relationships).toContainEqual(new Relationship(0, node, other));
    expect(node.relationships.length).toBe(1);
    expect(other.relationships).toContainEqual(
      new Relationship(0, node, other)
    );
    expect(other.relationships.length).toBe(1);
  });
  it("should connect to itself", () => {
    const node = new Node(1, "Distance");

    node.connectTo(node, 0);

    expect(node.relationships).toContainEqual(new Relationship(0, node, node));
    expect(node.relationships.length).toBe(1);
  });
});
