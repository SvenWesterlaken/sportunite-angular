import {Sport} from "./sport";
export class SportEvent {

	name: string;
	minAttendees: number;
	maxAttendees: number;
	description: string;
	eventStartTime: string;
	eventEndTime: string;
	sport: Sport;
	sportEventId: string;

	constructor(name: string,
	            minAttendees: number,
	            maxAttendees: number,
	            description: string,
	            eventStartTime: string,
	            eventEndTime: string,
	            sport: Sport,
              id?: string) {
		this.name = name;
		this.minAttendees = minAttendees;
		this.maxAttendees = maxAttendees;
		this.description = description;
		this.eventStartTime = eventStartTime;
		this.eventEndTime = eventEndTime;
		this.sport = sport;
		this.sportEventId = id;
	}
}
