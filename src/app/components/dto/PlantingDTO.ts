export class PlantingDTO{
  private _crop_name: string;
  private _planting_location: string;
  private _planting_density: string;
  private _seeding_rate: string;
  private _seeding_depth: string;
  private _planting_method: string;
  private _soil_preparation: string;
  private _planting_date: string;

  constructor(crop_name: string, planting_location: string, planting_density: string, seeding_rate: string, seeding_depth: string, planting_method: string, soil_preparation: string, planting_date: string) {
    this._crop_name = crop_name;
    this._planting_location = planting_location;
    this._planting_density = planting_density;
    this._seeding_rate = seeding_rate;
    this._seeding_depth = seeding_depth;
    this._planting_method = planting_method;
    this._soil_preparation = soil_preparation;
    this._planting_date = planting_date;
  }

  get crop_name(): string {
    return this._crop_name;
  }

  set crop_name(value: string) {
    this._crop_name = value;
  }

  get planting_location(): string {
    return this._planting_location;
  }

  set planting_location(value: string) {
    this._planting_location = value;
  }

  get planting_density(): string {
    return this._planting_density;
  }

  set planting_density(value: string) {
    this._planting_density = value;
  }

  get seeding_rate(): string {
    return this._seeding_rate;
  }

  set seeding_rate(value: string) {
    this._seeding_rate = value;
  }

  get seeding_depth(): string {
    return this._seeding_depth;
  }

  set seeding_depth(value: string) {
    this._seeding_depth = value;
  }

  get planting_method(): string {
    return this._planting_method;
  }

  set planting_method(value: string) {
    this._planting_method = value;
  }

  get soil_preparation(): string {
    return this._soil_preparation;
  }

  set soil_preparation(value: string) {
    this._soil_preparation = value;
  }

  get planting_date(): string {
    return this._planting_date;
  }

  set planting_date(value: string) {
    this._planting_date = value;
  }
}
