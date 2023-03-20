export class PlantDTO{
  private _plantMethod: string;
  private _MethodDesc: string;

  constructor(plantMethod: string, MethodDesc: string) {
    this._plantMethod = plantMethod;
    this._MethodDesc = MethodDesc;
  }

  get plantMethod(): string {
    return this._plantMethod;
  }

  set plantMethod(value: string) {
    this._plantMethod = value;
  }

  get MethodDesc(): string {
    return this._MethodDesc;
  }

  set MethodDesc(value: string) {
    this._MethodDesc = value;
  }
}
