export class FertilizingDTO{
  private _fertilize_name: string;
  private _fertilizer_type: string;
  private _fertilizer_app_method: string;
  private _fertilizer_app_fre: string;
  private _application_rate: string;
  private _fertilizer_placement: string;
  private _application_timing: string;
  private _fertigation: string;
  private _fertlizing_date: string;
  private _message: string;
  private _crop_id: string;

  constructor(fertilize_name: string, fertilizer_type: string, fertilizer_app_method: string, fertilizer_app_fre: string, application_rate: string, fertilizer_placement: string, application_timing: string, fertigation: string, fertlizing_date: string, message: string, crop_id: string) {
    this._fertilize_name = fertilize_name;
    this._fertilizer_type = fertilizer_type;
    this._fertilizer_app_method = fertilizer_app_method;
    this._fertilizer_app_fre = fertilizer_app_fre;
    this._application_rate = application_rate;
    this._fertilizer_placement = fertilizer_placement;
    this._application_timing = application_timing;
    this._fertigation = fertigation;
    this._fertlizing_date = fertlizing_date;
    this._message = message;
    this._crop_id = crop_id;
  }

  get fertilize_name(): string {
    return this._fertilize_name;
  }

  set fertilize_name(value: string) {
    this._fertilize_name = value;
  }

  get fertilizer_type(): string {
    return this._fertilizer_type;
  }

  set fertilizer_type(value: string) {
    this._fertilizer_type = value;
  }

  get fertilizer_app_method(): string {
    return this._fertilizer_app_method;
  }

  set fertilizer_app_method(value: string) {
    this._fertilizer_app_method = value;
  }

  get fertilizer_app_fre(): string {
    return this._fertilizer_app_fre;
  }

  set fertilizer_app_fre(value: string) {
    this._fertilizer_app_fre = value;
  }

  get application_rate(): string {
    return this._application_rate;
  }

  set application_rate(value: string) {
    this._application_rate = value;
  }

  get fertilizer_placement(): string {
    return this._fertilizer_placement;
  }

  set fertilizer_placement(value: string) {
    this._fertilizer_placement = value;
  }

  get application_timing(): string {
    return this._application_timing;
  }

  set application_timing(value: string) {
    this._application_timing = value;
  }

  get fertigation(): string {
    return this._fertigation;
  }

  set fertigation(value: string) {
    this._fertigation = value;
  }

  get fertlizing_date(): string {
    return this._fertlizing_date;
  }

  set fertlizing_date(value: string) {
    this._fertlizing_date = value;
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
