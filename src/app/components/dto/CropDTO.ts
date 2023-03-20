export class CropDTO{
  private _crop_name: string;
  private _crop_variety: string;
  private _crop_status: string;

  constructor(crop_name: string, crop_variety: string, crop_status: string) {
    this._crop_name = crop_name;
    this._crop_variety = crop_variety;
    this._crop_status = crop_status;
  }

  get crop_name(): string {
    return this._crop_name;
  }

  set crop_name(value: string) {
    this._crop_name = value;
  }

  get crop_variety(): string {
    return this._crop_variety;
  }

  set crop_variety(value: string) {
    this._crop_variety = value;
  }

  get crop_status(): string {
    return this._crop_status;
  }

  set crop_status(value: string) {
    this._crop_status = value;
  }
}
