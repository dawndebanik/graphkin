export default class Node {
  constructor(
    readonly id: number,
    private _relationshipIds: number[] = [],
    private _type: string,
    private _data: unknown = {}
  ) {}

  get relationshipIds(): number[] {
    return this.relationshipIds;
  }

  get type(): string {
    return this._type;
  }

  get data(): unknown {
    return this._data;
  }

  /*connectTo(otherNode: Node, relationshipId: number): void {
    const newRelationship = new Relationship(relationshipId, this, otherNode);
    this._relationships.push(newRelationship);
    if (otherNode !== this) {
      otherNode._relationships.push(newRelationship);
    }
  }*/
}
