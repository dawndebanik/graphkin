import Node from "./node";

export default class Relationship {
  constructor(
    private id: number,
    private leftNode: Node,
    private rightNode: Node,
    private data: unknown
  ) {}
}
