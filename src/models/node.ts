export default class Node {
  constructor(
    readonly id: number,
    readonly type: string,
    private relationshipIds: number[],
    private data: unknown
  ) {}
}
