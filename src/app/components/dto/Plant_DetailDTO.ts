export class Plant_DetailDTO{
  private _plantMethod: string;
  private _planting_location: string;
  private _planting_density: string;
  private _seeding_rate: string;
  private _seeding_depth: string;
  private _soil_preparation: string;
  private _planting_date: string;
  private _water_duration: string;
  private _message: string;
  private _crop_id: string;

  constructor(plantMethod: string, planting_location: string, planting_density: string, seeding_rate: string, seeding_depth: string, soil_preparation: string, planting_date: string, water_duration: string, message: string, crop_id: string) {
    this._plantMethod = plantMethod;
    this._planting_location = planting_location;
    this._planting_density = planting_density;
    this._seeding_rate = seeding_rate;
    this._seeding_depth = seeding_depth;
    this._soil_preparation = soil_preparation;
    this._planting_date = planting_date;
    this._water_duration = water_duration;
    this._message = message;
    this._crop_id = crop_id;
  }

  get plantMethod(): string {
    return this._plantMethod;
  }

  set plantMethod(value: string) {
    this._plantMethod = value;
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

  get water_duration(): string {
    return this._water_duration;
  }

  set water_duration(value: string) {
    this._water_duration = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get crop_id(): string {
    return this._crop_id;
  }

  set crop_id(value: string) {
    this._crop_id = value;
  }
}
