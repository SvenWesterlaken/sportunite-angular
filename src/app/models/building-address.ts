export class BuildingAddress {
  streetName: string;
  houseNumber: number;
  suffix?: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;

  constructor(streetName: string, houseNumber: number, suffix: string, city: string, state: string, country: string, zipCode: string ) {
    this.state = state;
    this.country = country;
    this.houseNumber = houseNumber;
    this.suffix = suffix;
    this.city = city;
    this.streetName = streetName;
    this.zipCode = zipCode;
  }
}
