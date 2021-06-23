import {Injectable} from "@angular/core";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../Store";
import {EventsService} from "../../services/events/events.service";
import {Event} from "../../entities/Event";

@Injectable({ providedIn: "root" })
export class EventActions {
  constructor (private ngRedux: NgRedux<AppState>, private eventService: EventsService) {
  }

  // enums to be used in reducer to switch on type of action
  static ADD_EVENT: string = "ADD_EVENT";
  static UPDATE_EVENT: string = "UPDATE_EVENT";
  static READ_EVENTS: string = "READ_EVENTS";
  static DELETE_EVENT: string = "DELETE_EVENT";

  addEvent(newEvent: Event) {

  }

  updateEvent(updatedEvent: Event) {

  }

  readEvents() {

  }

  deleteEvent(eventToDelete: Event) {

  }
}
