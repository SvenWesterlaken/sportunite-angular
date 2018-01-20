import {Hall} from './hall';
import {BuildingAddress} from './building-address';

export class Building {

  name: string;
  halls: Hall[];
  address: BuildingAddress;
  buildingId: string;


  constructor(name: string, halls: Hall[], address: BuildingAddress, buildingId: string) {
    this.name = name;
    this.halls = halls;
    this.address = address;
    this.buildingId = buildingId;
  }

}
