import { Models } from "../constants";
import Graph from "./graph";
import MetadataGenerable, { Metadata } from "../metadata/metadata-generable";

export default class Database implements MetadataGenerable {
  constructor(
    private id: number,
    private name: string,
    private graphs: Graph[] = []
  ) {}

  metadata(): Metadata {
    const graphIds: number[] = [];
    this.graphs.forEach((graph) => graphIds.push(graph.id));

    return {
      type: Models.DATABASE,
      id: this.id,
      data: {
        name: this.name,
        graphIds,
      },
    };
  }
}
