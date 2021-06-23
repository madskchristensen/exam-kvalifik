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
    this.eventService.add(newEvent).subscribe((res: any)=> {

      newEvent.id = res.name;

      this.ngRedux.dispatch({
        type: EventActions.ADD_EVENT,
        payload: newEvent
      })
    });
  }

  updateEvent(updatedEvent: Event) {
    this.eventService.update(updatedEvent).subscribe( () => {

      this.ngRedux.dispatch({
        type: EventActions.UPDATE_EVENT,
        payload: updatedEvent
      });
    });
  }

  readEvents() {
    let events: Event[] = [];

    this.eventService.getAll().subscribe((res: any) => {
      // service returns json tree containing all posts -> convert to array
      for (let id in res) {
        res[id].id = id // add id property to every post object
        events.push(res[id] as Event) // add post to post array
      }

      this.ngRedux.dispatch({
        type: EventActions.READ_EVENTS,
        payload: events
      });
    });
  }

  deleteEvent(eventToDelete: Event) {
    this.eventService.delete(eventToDelete).subscribe(() => {

      this.ngRedux.dispatch({
        type: EventActions.DELETE_EVENT,
        payload: eventToDelete
      });
    });
  }
}
