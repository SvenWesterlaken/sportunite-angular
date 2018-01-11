import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Address} from '../models/address';


@Injectable()
export class AddressService {

  constructor(private http: HttpClient) {}

  getAddress(postcode: string, number: number, suffix?: string): Observable<Address> {
    return this.http.get<Address>(`${environment.api.url}/address`, {
      params: {
        postal_code: postcode,
        number: number.toString()
        // suffix: suffix
      }
    });
  }

}
