import Node from "./node";

export default class Relationship {
  constructor(
    readonly id: number,
    private leftNode: Node,
    private rightNode: Node,
    private data: unknown = {}
  ) {}
}
