import { Models } from "../constants";
import MetadataGenerable, { Metadata } from "../metadata/MetadataGenerable";
import Relationship from "./relationship";

export default class Node implements MetadataGenerable {
  constructor(
    readonly id: number,
    private relationships: Relationship[] = [],
    private data: unknown = {}
  ) {}

  metadata(): Metadata {
    const relationshipIds: number[] = [];
    this.relationships.forEach((relationship) =>
      relationshipIds.push(relationship.id)
    );

    return {
      type: Models.NODE,
      id: this.id,
      data: { relationshipIds },
    };
  }
}
