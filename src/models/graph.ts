import { Models } from "../constants";
import MetadataGenerable, { Metadata } from "../metadata/MetadataGenerable";
import Node from "./node";

export default class Graph implements MetadataGenerable {
  constructor(
    readonly id: number,
    private name: string,
    private nodes: Node[]
  ) {}

  metadata(): Metadata {
    const nodeIds: number[] = [];
    this.nodes.forEach((node) => nodeIds.push(node.id));

    return {
      type: Models.GRAPH,
      id: this.id,
      data: {
        name: this.name,
        nodeIds,
      },
    };
  }
}
