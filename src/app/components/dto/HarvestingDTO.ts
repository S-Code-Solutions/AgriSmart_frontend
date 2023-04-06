export class HarvestingDTO{
  private _harvest_method: string;
  private _harvesting_equipment: string;
  private _labor_requirement: string;
  private _storage_requirement: string;
  private _harvest_quality: string;
  private _harvest_cost: string;
  private _harvest_waste: string;
  private _harvesting_date: string;
  private _message: string;
  private _crop_id: string;

  constructor(harvest_method: string, harvesting_equipment: string, labor_requirement: string, storage_requirement: string, harvest_quality: string, harvest_cost: string, harvest_waste: string, harvesting_date: string, message: string, crop_id: string) {
    this._harvest_method = harvest_method;
    this._harvesting_equipment = harvesting_equipment;
    this._labor_requirement = labor_requirement;
    this._storage_requirement = storage_requirement;
    this._harvest_quality = harvest_quality;
    this._harvest_cost = harvest_cost;
    this._harvest_waste = harvest_waste;
    this._harvesting_date = harvesting_date;
    this._message = message;
    this._crop_id = crop_id;
  }

  get harvest_method(): string {
    return this._harvest_method;
  }

  set harvest_method(value: string) {
    this._harvest_method = value;
  }

  get harvesting_equipment(): string {
    return this._harvesting_equipment;
  }

  set harvesting_equipment(value: string) {
    this._harvesting_equipment = value;
  }

  get labor_requirement(): string {
    return this._labor_requirement;
  }

  set labor_requirement(value: string) {
    this._labor_requirement = value;
  }

  get storage_requirement(): string {
    return this._storage_requirement;
  }

  set storage_requirement(value: string) {
    this._storage_requirement = value;
  }

  get harvest_quality(): string {
    return this._harvest_quality;
  }

  set harvest_quality(value: string) {
    this._harvest_quality = value;
  }

  get harvest_cost(): string {
    return this._harvest_cost;
  }

  set harvest_cost(value: string) {
    this._harvest_cost = value;
  }

  get harvest_waste(): string {
    return this._harvest_waste;
  }

  set harvest_waste(value: string) {
    this._harvest_waste = value;
  }

  get harvesting_date(): string {
    return this._harvesting_date;
  }

  set harvesting_date(value: string) {
    this._harvesting_date = value;
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
