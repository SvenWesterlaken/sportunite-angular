import {Hall} from "./Hall";
export class Reservation {

  reservationId: string;
  sportEventId: string;
  definite: boolean;
  startTime: string;
  timeFinish: string;
  hallId: string;



  constructor(definite: boolean, timeFinish:string, startTime: string, sportEventId: string, hallId: string ) {
    this.sportEventId = sportEventId;
    this.hallId = hallId;
    this.definite = definite;
    this.startTime = startTime;
    this.timeFinish = timeFinish;


  }
}
