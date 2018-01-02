import {Sport} from "./Sport";
export class Hall {

  name: string;
  hallId : number;
  openingHours: string[];
  sports: Sport[];

  constructor(name : string, hallId: number, openingHours: string[], sports: Sport[]) {
    this.name = name;
    this.hallId = hallId;
    this.openingHours = openingHours;
    this.sports = sports
  }
}
