export class HarvestingDTO{
  private _crop_name: string;
  private _harvest_method: string;
  private _harvesting_equipment: string;
  private _labor_requirement: string;
  private _storage_requirement: string;
  private _harvest_quality: string;
  private _market_destination: string;
  private _post_harvest_handling: string;
  private _yield_analysis: string;
  private _crop_maturity: string;
  private _harvest_labor_cost: string;
  private _harvest_transport: string;
  private _harvest_waste: string;
  private _harvesting_date: string;

  constructor(crop_name: string, harvest_method: string, harvesting_equipment: string, labor_requirement: string, storage_requirement: string, harvest_quality: string, market_destination: string, post_harvest_handling: string, yield_analysis: string, crop_maturity: string, harvest_labor_cost: string, harvest_transport: string, harvest_waste: string, harvesting_date: string) {
    this._crop_name = crop_name;
    this._harvest_method = harvest_method;
    this._harvesting_equipment = harvesting_equipment;
    this._labor_requirement = labor_requirement;
    this._storage_requirement = storage_requirement;
    this._harvest_quality = harvest_quality;
    this._market_destination = market_destination;
    this._post_harvest_handling = post_harvest_handling;
    this._yield_analysis = yield_analysis;
    this._crop_maturity = crop_maturity;
    this._harvest_labor_cost = harvest_labor_cost;
    this._harvest_transport = harvest_transport;
    this._harvest_waste = harvest_waste;
    this._harvesting_date = harvesting_date;
  }

  get crop_name(): string {
    return this._crop_name;
  }

  set crop_name(value: string) {
    this._crop_name = value;
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

  get market_destination(): string {
    return this._market_destination;
  }

  set market_destination(value: string) {
    this._market_destination = value;
  }

  get post_harvest_handling(): string {
    return this._post_harvest_handling;
  }

  set post_harvest_handling(value: string) {
    this._post_harvest_handling = value;
  }

  get yield_analysis(): string {
    return this._yield_analysis;
  }

  set yield_analysis(value: string) {
    this._yield_analysis = value;
  }

  get crop_maturity(): string {
    return this._crop_maturity;
  }

  set crop_maturity(value: string) {
    this._crop_maturity = value;
  }

  get harvest_labor_cost(): string {
    return this._harvest_labor_cost;
  }

  set harvest_labor_cost(value: string) {
    this._harvest_labor_cost = value;
  }

  get harvest_transport(): string {
    return this._harvest_transport;
  }

  set harvest_transport(value: string) {
    this._harvest_transport = value;
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
}
