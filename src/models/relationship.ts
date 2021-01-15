import { Models } from "../constants";
import CoreDataGenerable, { CoreData } from "../core-data/core-data-generable";
import MetadataGenerable, { Metadata } from "../metadata/metadata-generable";
import Node from "./node";

export default class Relationship
  implements MetadataGenerable, CoreDataGenerable {
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

  coreData(): CoreData {
    return {
      type: Models.RELATIONSHIP,
      id: this.id,
      data: this.data,
    };
  }
}
