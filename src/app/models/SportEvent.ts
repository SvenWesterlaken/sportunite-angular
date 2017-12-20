import {Sport} from "./Sport";
export class SportEvent {
	
	private name: string;
	private minAttendees: number;
	private maxAttendees: number;
	private description: string;
	private eventStartTime: string;
	private eventEndTime: string;
	private sport: Sport;
	
	constructor(name: string,
	            minAttendees: number,
	            maxAttendees: number,
	            description: string,
	            eventStartTime: string,
	            eventEndTime: string,
	            sport: Sport) {
		this.name = name;
		this.minAttendees = minAttendees;
		this.maxAttendees = maxAttendees;
		this.description = description;
		this.eventStartTime = eventStartTime;
		this.eventEndTime = eventEndTime;
		this.sport = sport;
	}
}