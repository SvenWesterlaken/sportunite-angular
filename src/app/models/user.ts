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
    _id?: string;


    // constructor(email: string, password: string, firstname: string, lastname: string, birth: Date, gender: string, favorite_sports: [string], biography: string, address: Address, userId?: string) {
    //     this.email = email;
    //     this.password = password;
    //     this.firstname = firstname;
    //     this.lastname = lastname;
    //     this.birth = birth;
    //     this.gender = gender;
    //     this.favorite_sports = favorite_sports;
    //     this.biography = biography;
    //     this.address = address;
    //     this.userId = userId;
    // }
}