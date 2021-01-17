import Node from "../../src/models/node";
import Relationship from "../../src/models/relationship";

describe("Relationship Model", () => {
  it("should generate proper metadata for a relationship", () => {
    const relationship = new Relationship(
      42,
      new Node(1, "Distance"),
      new Node(2, "Distance"),
      {
        something: "something",
      }
    );

    const metadta = relationship.metadata();

    expect(metadta).toEqual({
      modelName: "relationship",
      id: 42,
      data: {
        leftNodeId: 1,
        rightNodeId: 2,
      },
    });
  });
});
