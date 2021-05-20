import { combineReducers } from "redux";
import { postReducer } from "./reducers/PostReducer";
import { Post } from "../entities/Post";

export class PostState {
  posts!: Post[];
}

// will contain any states like posts, users etc.
export class AppState {
  posts?: PostState;
}

export const rootReducer = combineReducers<AppState>({
  posts: postReducer
})
