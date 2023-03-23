export class UserDTO{
  private _password: string;
  private _roleCode: string;
  private _address: string;
  private _username: string;
  private _status: string;
  private _phoneNo1: string;
  private _phoneNo2: string;
  private _idPhoto: string;
  private _remarks: string;
  private _email: string;
  private _name: string;

  constructor(password: string, roleCode: string, address: string, username: string, status: string, phoneNo1: string, phoneNo2: string, idPhoto: string, remarks: string, email: string, name: string) {
    this._password = password;
    this._roleCode = roleCode;
    this._address = address;
    this._username = username;
    this._status = status;
    this._phoneNo1 = phoneNo1;
    this._phoneNo2 = phoneNo2;
    this._idPhoto = idPhoto;
    this._remarks = remarks;
    this._email = email;
    this._name = name;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get roleCode(): string {
    return this._roleCode;
  }

  set roleCode(value: string) {
    this._roleCode = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get phoneNo1(): string {
    return this._phoneNo1;
  }

  set phoneNo1(value: string) {
    this._phoneNo1 = value;
  }

  get phoneNo2(): string {
    return this._phoneNo2;
  }

  set phoneNo2(value: string) {
    this._phoneNo2 = value;
  }

  get idPhoto(): string {
    return this._idPhoto;
  }

  set idPhoto(value: string) {
    this._idPhoto = value;
  }

  get remarks(): string {
    return this._remarks;
  }

  set remarks(value: string) {
    this._remarks = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
