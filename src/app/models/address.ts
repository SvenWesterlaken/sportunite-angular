export class Address {
  street: string;
  number: number;
  suffix?: string;
  postal_code: string;
  city: string;
  state: string;
  country?: string;
  geometry?: Geometry;
  coordinates?: [number];
}

class Geometry {
  coordinates: [number];
}
