import Node from "./node";

export default class Graph {
  constructor(private name: string, private nodes: Node[] = []) {}
}
