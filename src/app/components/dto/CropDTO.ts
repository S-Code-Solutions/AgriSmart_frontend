export class CropDTO{
  private _crop_name: string;
  private _crop_variety: string;
  private _planting_date: string;
  private _harvest_date: string;
  private _expected_yield: string;
  private _soil_type: string;
  private _fertilizer_control: string;
  private _pesticide_type: string;
  private _crop_status: string;
  private _cost: string;
  private _location: string;

  constructor(crop_name: string, crop_variety: string, planting_date: string, harvest_date: string, expected_yield: string, soil_type: string, fertilizer_control: string, pesticide_type: string, crop_status: string, cost: string, location: string) {
    this._crop_name = crop_name;
    this._crop_variety = crop_variety;
    this._planting_date = planting_date;
    this._harvest_date = harvest_date;
    this._expected_yield = expected_yield;
    this._soil_type = soil_type;
    this._fertilizer_control = fertilizer_control;
    this._pesticide_type = pesticide_type;
    this._crop_status = crop_status;
    this._cost = cost;
    this._location = location;
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

  get planting_date(): string {
    return this._planting_date;
  }

  set planting_date(value: string) {
    this._planting_date = value;
  }

  get harvest_date(): string {
    return this._harvest_date;
  }

  set harvest_date(value: string) {
    this._harvest_date = value;
  }

  get expected_yield(): string {
    return this._expected_yield;
  }

  set expected_yield(value: string) {
    this._expected_yield = value;
  }

  get soil_type(): string {
    return this._soil_type;
  }

  set soil_type(value: string) {
    this._soil_type = value;
  }

  get fertilizer_control(): string {
    return this._fertilizer_control;
  }

  set fertilizer_control(value: string) {
    this._fertilizer_control = value;
  }

  get pesticide_type(): string {
    return this._pesticide_type;
  }

  set pesticide_type(value: string) {
    this._pesticide_type = value;
  }

  get crop_status(): string {
    return this._crop_status;
  }

  set crop_status(value: string) {
    this._crop_status = value;
  }

  get cost(): string {
    return this._cost;
  }

  set cost(value: string) {
    this._cost = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }
}
