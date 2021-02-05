export default class Node {
  constructor(
    private readonly _id: number,
    private relationshipIds: number[],
    private _type: string,
    private data: unknown
  ) {}

  get type(): string {
    return this._type;
  }

  get id(): number {
    return this._id;
  }
}
