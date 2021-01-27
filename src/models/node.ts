import Relationship from "./relationship";

export default class Node {
  constructor(
    readonly id: number,
    private _relationships: Relationship[] = [],
    private data: unknown = {}
  ) {}

  get relationships(): Relationship[] {
    return this._relationships;
  }

  connectTo(otherNode: Node, relationshipId: number): void {
    const newRelationship = new Relationship(relationshipId, this, otherNode);
    this._relationships.push(newRelationship);
    if (otherNode !== this) {
      otherNode._relationships.push(newRelationship);
    }
  }
}
