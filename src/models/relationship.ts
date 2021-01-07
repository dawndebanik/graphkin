import { Models } from "../constants";
import MetadataGenerable, { Metadata } from "../metadata/MetadataGenerable";
import Node from "./node";

export default class Relationship implements MetadataGenerable {
  constructor(
    readonly id: number,
    private leftNode: Node,
    private rightNode: Node,
    private data: unknown = {}
  ) {}

  metadata(): Metadata {
    return {
      type: Models.RELATIONSHIP,
      id: this.id,
      data: {
        leftNodeId: this.leftNode.id,
        rightNodeId: this.rightNode.id,
      },
    };
  }
}
