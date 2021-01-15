import { Models } from "../constants";
import CoreDataGenerable, { CoreData } from "../core-data/core-data-generable";
import MetadataGenerable, { Metadata } from "../metadata/metadata-generable";
import Relationship from "./relationship";

export default class Node implements MetadataGenerable, CoreDataGenerable {
  constructor(
    readonly id: number,
    private _relationships: Relationship[] = [],
    private data: unknown = {}
  ) {}

  get relationships(): Relationship[] {
    return this._relationships;
  }

  coreData(): CoreData {
    return {
      type: Models.NODE,
      id: this.id,
      data: this.data,
    };
  }

  metadata(): Metadata {
    const relationshipIds: number[] = [];
    this._relationships.forEach((relationship) =>
      relationshipIds.push(relationship.id)
    );

    return {
      type: Models.NODE,
      id: this.id,
      data: { relationshipIds },
    };
  }

  connectTo(otherNode: Node, relationshipId: number): void {
    const newRelationship = new Relationship(relationshipId, this, otherNode);
    this._relationships.push(newRelationship);
    if (otherNode !== this) {
      otherNode._relationships.push(newRelationship);
    }
  }
}
