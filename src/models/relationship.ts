import Node from "./node";

export default class Relationship {
  constructor(
    readonly id: number,
    readonly type: string,
    private leftNodeId: number,
    private rightNodeId: number,
    private data: unknown = {}
  ) {}
}
