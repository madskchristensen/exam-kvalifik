import {CollectionState} from "../Store";
import {CollectionActions} from "../actions/CollectionActions";
import {tassign} from "tassign";

export const collections = [];

const INITIAL_STATE: CollectionState = { collections };

export function collectionReducer(state: CollectionState = INITIAL_STATE, action: any) {

  switch (action.type) {

    case CollectionActions.ADD_COLLECTION:
      return tassign(state, {});

    case CollectionActions.READ_COLLECTIONS:
      return tassign(state, {});

    case CollectionActions.UPDATE_COLLECTION:
      return tassign(state, {});

    case CollectionActions.DELETE_COLLECTION:
      return tassign(state, {});

    default:
      return state;
  }
}
