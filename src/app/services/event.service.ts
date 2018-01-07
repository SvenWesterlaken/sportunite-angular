import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Sport} from "../models/Sport";
import {Http} from "@angular/http";
import {SportEvent} from "../models/SportEvent";

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {
    }


    addEvent(sportEvent): Observable<any> {
        return this.http.post(`${environment.backend.url}/sportevents`, sportEvent);
    }

    addUserToEvent(eventId, email): Observable<any> {
        return this.http.post(`${environment.api.url}/sportevents`, { email : email, eventId: eventId });


    }

    addReservation(reservation): Observable<any> {
      console.log(reservation);
      return this.http.post(`${environment.backend.url}/reservations`, reservation);
    }
    getSports(): Observable<any> {
       return this.http.get(`${environment.backend.url}/sports`)
    }

    getHalls(): Observable<any> {
      return this.http.get(`${environment.backend.url}/halls`)
    }

    getBuildings(): Observable<any> {
      return this.http.get(`${environment.backend.url}/buildings`)
    }


}
