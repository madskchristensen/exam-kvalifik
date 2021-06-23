import {EventState} from "../Store";
import {EventActions} from "../actions/EventActions";
import {tassign} from "tassign";

export const events = [];

const INITIAL_STATE: EventState = { events };

export function eventReducer(state: EventState = INITIAL_STATE, action: any) {

  switch (action.type) {

    case EventActions.ADD_EVENT:
      return tassign(state, { events: [...state.events, action.payload] });

    case EventActions.READ_EVENTS:
      return tassign(state, { events: action.payload });

    case EventActions.UPDATE_EVENT:
      const newArray = [...state.events];
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      newArray[index] = action.payload;

      return tassign(state, { events: newArray });

    case EventActions.DELETE_EVENT:
      const newArray2 = [...state.events];
      const index2 = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      newArray2.splice(index2, 1);

      return tassign(state, { events: newArray2 });

    default:
      return state;
  }
}
