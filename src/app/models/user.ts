import {Address} from './address';

export class User {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birth: Date;
  gender: string;
  favorite_sports?: [string];
  biography?: string;
  address: Address;
}
