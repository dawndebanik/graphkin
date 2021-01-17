import {Models} from "../constants";
import MetadataGenerable, {Metadata} from "../metadata/MetadataGenerable";
import Relationship from "./relationship";

export default class Node implements MetadataGenerable {
  constructor(
    readonly id: number,
    private type: string,
    private _relationships: Relationship[] = [],
    private data: unknown = {}
  ) {}

  get relationships(): Relationship[] {
    return this._relationships;
  }

  metadata(): Metadata {
    const relationshipIds: number[] = [];
    this._relationships.forEach((relationship) =>
      relationshipIds.push(relationship.id)
    );

    return {
      modelName: Models.NODE,
      id: this.id,
      type: this.type,
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
