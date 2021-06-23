import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';

export const posts = [];

const INITIAL_STATE: PostState = { posts };

export function postReducer(state: PostState = INITIAL_STATE, action: any) {

  switch (action.type) {

    case PostActions.ADD_POST:
      return tassign(state, { posts: [...state.posts, action.payload] });

    case PostActions.READ_POSTS:
      return tassign(state, { posts: action.payload });

    case PostActions.UPDATE_POST:
      const newArray = [...state.posts];
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      newArray[index] = action.payload;

      return tassign(state, { posts: newArray });

    case PostActions.DELETE_POST:
      const newArray2 = [...state.posts];
      const index2 = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      newArray2.splice(index2, 1);

      return tassign(state, { posts: newArray2 });

    default:
      return state;
  }
}
