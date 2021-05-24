import { tassign } from "tassign";
import { PostState } from "../Store";
import { PostActions } from "../actions/PostActions";
import { Post } from "../../entities/Post";

export const posts = [
  {id: '1', title: "test1", text: "hmmm", published: false, pinned: false } as Post,
  {id: '2', title: "test2", text: "hmmm", published: false, pinned: false } as Post,
  {id: '3', title: "test3", text: "hmmm", published: false, pinned: false } as Post,
  {id: '4', title: "test4", text: "hmmm", published: true, pinned: true } as Post,
];

const INITIAL_STATE: PostState = {posts: posts};

export function postReducer(state: PostState = INITIAL_STATE, action: any) {
  switch(action.type) {

    case PostActions.ADD_POST:
      // do something

    case PostActions.UPDATE_POST:
      // do something

    case PostActions.READ_POSTS:
      // do something

    default:
      return state;
  }
}
