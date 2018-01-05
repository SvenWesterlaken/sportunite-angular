import {Hall} from "./Hall";
import {BuildingAddress} from "./BuildingAddress";
export class Building {

  name: string;
  halls: Hall[];
  address: BuildingAddress;
  buildingId: string;


  constructor(name : string, halls: Hall[], address: BuildingAddress, buildingId: string) {
    this.name = name;
    this.halls = halls;
    this.address = address;
    this.buildingId = buildingId;
  }

}
