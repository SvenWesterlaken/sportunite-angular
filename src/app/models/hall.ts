import {Sport} from "./sport";
export class Hall {

  name: string;
  hallId: number;
  buildingId: string;
  openingHours: string[];
  sports: Sport[];

  constructor(name: string, hallId: number, openingHours: string[], sports: Sport[], buildingId: string) {
    this.name = name;
    this.hallId = hallId;
    this.openingHours = openingHours;
    this.sports = sports;
    this.buildingId = buildingId;
  }
}
