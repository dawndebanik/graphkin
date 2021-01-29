import Node from "./node";

export default class Graph {
  private readonly _name: string;
  private _nodes: Node[];

  constructor(private __name: string, private __nodes: Node[] = []) {
    this._name = __name;
    this._nodes = __nodes;
  }

  get name(): string {
    return this._name;
  }

  get nodes(): Node[] {
    return this._nodes;
  }
}
