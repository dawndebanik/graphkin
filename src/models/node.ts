import Relationship from "./relationship";

export default class Node {
  constructor(
    private id: number,
    private relationships: Relationship[],
    private data: unknown
  ) {}
}
