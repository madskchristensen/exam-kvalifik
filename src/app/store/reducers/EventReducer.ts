import {EventState} from "../Store";
import {EventActions} from "../actions/EventActions";
import {tassign} from "tassign";

export const events = [];

const INITIAL_STATE: EventState = { events };

export function eventReducer(state: EventState = INITIAL_STATE, action: any) {

  switch (action.type) {

    case EventActions.ADD_EVENT:
      return tassign(state, {});

    case EventActions.READ_EVENTS:
      return tassign(state, {});

    case EventActions.UPDATE_EVENT:
      return tassign(state, {});

    case EventActions.DELETE_EVENT:
      return tassign(state, {});

    default:
      return state;
  }
}
