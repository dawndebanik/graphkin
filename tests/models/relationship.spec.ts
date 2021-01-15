import Node from "../../src/models/node";
import Relationship from "../../src/models/relationship";

describe("Relationship Model", () => {
  it("should generate proper metadata for a relationship", () => {
    const relationship = new Relationship(42, new Node(1), new Node(2), {
      something: "something",
    });

    const metadta = relationship.metadata();

    expect(metadta).toEqual({
      type: "relationship",
      id: 42,
      data: {
        leftNodeId: 1,
        rightNodeId: 2,
      },
    });
  });

  it("should generate core data stored in the relationship", () => {
    const coreData = {
      to: "be",
      or: "not",
    };
    const dummyNode = new Node(1);

    const actualCoreData = new Relationship(
      42,
      dummyNode,
      dummyNode,
      coreData
    ).coreData();

    expect(actualCoreData).toEqual({
      type: "relationship",
      id: 42,
      data: coreData,
    });
  });
});
