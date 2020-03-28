export class MeshManager {

  protected _data: any[] = []

  public size() {
    return this._data.length;
  }

  public set(name: string, asset: any): void {
    // name, asset)
    this._data.push(asset);
  }

  public get(name: string = '') {
    return this._data;
  }


}
