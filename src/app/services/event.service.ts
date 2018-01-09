import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Sport} from '../models/sport';
import {SportEvent} from '../models/sportevent';
import {Hall} from '../models/hall';
import {Building} from '../models/building';
import {Reservation} from '../models/reservation';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {}

    addEvent(sportEvent): Promise<any> {
      return this.http.post(`${environment.backend.url}/sportevents`, sportEvent).toPromise();
    }

    addUserToEvent(eventId): Promise<any> {
      return this.http.post(`${environment.api.url}/sportevents`, { eventId: eventId }).toPromise();
    }

    addReservation(reservation): Promise<Reservation> {
      return this.http.post<Reservation>(`${environment.backend.url}/reservations`, reservation).toPromise();
    }

    getSports(): Promise<Sport[]> {
      return this.http.get<{_embedded: Sport[], _links: any}>(`${environment.backend.url}/sports`).toPromise()
        .then((result: {_embedded: Sport[], _links: any}) => result._embedded);
    }

    getHalls(): Promise<Hall[]> {
      return this.http.get<{_embedded: Hall[], _links: any}>(`${environment.backend.url}/halls`).toPromise()
        .then((result: {_embedded: Hall[], _links: any}) => result._embedded);
    }

    getBuildings(): Promise<Building[]> {
      return this.http.get<{_embedded: Building[], _links: any}>(`${environment.backend.url}/buildings`).toPromise()
        .then((result: {_embedded: Building[], _links: any}) => result._embedded);
    }


}
