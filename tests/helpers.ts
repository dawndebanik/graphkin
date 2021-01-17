/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Database from "../src/models/database";
import Graph from "../src/models/graph";
import Node from "../src/models/node";
import Relationship from "../src/models/relationship";

export function testRelationship({
  id = 0,
  leftNodeId = 0,
  rightNodeId = 0,
}): Relationship {
  const leftNode = new Node(leftNodeId, "Distance");
  const rightNode = new Node(rightNodeId, "Distance");

  return new Relationship(id, leftNode, rightNode);
}

export function testNode({ id = 0, relationships = [], data = {} }): Node {
  if (relationships.length === 0) {
    const dummyRelationship = testRelationship({
      leftNodeId: id,
      rightNodeId: id,
    });
    return new Node(id, "Distance", [dummyRelationship], data);
  }

  return new Node(id, "Distance", relationships, data);
}

export function testGraph({
  id = 0,
  name = "test",
  nodes = [] as Array<Node>,
}): Graph {
  if (nodes.length === 0) {
    const dummyNode = testNode({});
    return new Graph(id, name, [dummyNode]);
  }

  return new Graph(id, name, nodes);
}

export function testDatabase({
  id = 0,
  name = "test",
  graphs = [] as Array<Graph>,
}): Database {
  if (graphs.length === 0) {
    const dummyGraph = testGraph({});
    return new Database(id, name, [dummyGraph]);
  }

  return new Database(id, name, graphs);
}
