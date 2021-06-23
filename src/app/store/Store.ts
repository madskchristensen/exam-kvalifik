import { combineReducers } from "redux";
import { postReducer } from "./reducers/PostReducer";
import { eventReducer } from "./reducers/EventReducer";
import { collectionReducer } from "./reducers/CollectionReducer";
import { Post } from "../entities/Post";
import { Event } from "../entities/Event";
import { Collection } from "../entities/Collection";

export class PostState {
  posts!: Post[];
}

export class EventState {
  events!: Event[];
}

export class CollectionState {
  collections!: Collection[];
}

// will contain any states like posts, users etc.
export class AppState {
  posts?: PostState;
  events?: EventState;
  collections?: CollectionState;
}

export const rootReducer = combineReducers<AppState>({
  posts: postReducer,
  events: eventReducer,
  collections: collectionReducer
})
