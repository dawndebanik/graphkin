export default class Database {
  private readonly _name: string;
  private _graphNames: string[];
  constructor(private __name: string, private __graphNames: string[] = []) {
    this._name = __name;
    this._graphNames = __graphNames;
  }

  get name(): string {
    return this._name;
  }
  get graphName(): string[] {
    return this._graphNames;
  }
}
