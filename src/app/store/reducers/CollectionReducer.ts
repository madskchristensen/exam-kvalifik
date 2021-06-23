import {CollectionState} from "../Store";
import {CollectionActions} from "../actions/CollectionActions";
import {tassign} from "tassign";

export const collections = [];

const INITIAL_STATE: CollectionState = { collections };

export function collectionReducer(state: CollectionState = INITIAL_STATE, action: any) {

  switch (action.type) {

    case CollectionActions.ADD_COLLECTION:
      return tassign(state, { collections: [...state.collections, action.payload] });

    case CollectionActions.READ_COLLECTIONS:
      return tassign(state, { collections: action.payload });

    case CollectionActions.UPDATE_COLLECTION:
      const newArray = [...state.collections];
      const index = state.collections.findIndex(
        (collection) => collection.id === action.payload.id
      );
      newArray[index] = action.payload;

      return tassign(state, { collections: newArray });

    case CollectionActions.DELETE_COLLECTION:
      const newArray2 = [...state.collections];
      const index2 = state.collections.findIndex(
        (collection) => collection.id === action.payload.id
      );
      newArray2.splice(index2, 1);

      return tassign(state, { collections: newArray2 });

    default:
      return state;
  }
}
