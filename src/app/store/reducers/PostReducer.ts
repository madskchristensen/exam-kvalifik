import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import { Post } from '../../entities/Post';

export const posts = [];
// export const posts = [
//   {id: '1', title: "test1", text: "hmmm", published: false, pinned: false } as Post,
//   {id: '2', title: "test2", text: "hmmm", published: false, pinned: false } as Post,
//   {id: '3', title: "test3", text: "hmmm", published: false, pinned: false } as Post,
//   {id: '4', title: "test4", text: "hmmm", published: true, pinned: true } as Post,
// ];

const INITIAL_STATE: PostState = { posts };

export function postReducer(state: PostState = INITIAL_STATE, action: any) {
/*  console.log("state", state);*/

  switch (action.type) {
    case PostActions.ADD_POST:
      return tassign(state, { posts: [...state.posts, action.payload] });

/*    case PostActions.UPDATE_POST:
      const newArray = [...state.posts];
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      newArray[index] = action.payload;
      return tassign(state, { posts: newArray });*/

    case PostActions.READ_POSTS:
      return tassign(state, { posts: action.payload });

/*    case PostActions.DELETE_POST:
      const newArray2 = [...state.posts];
      const index2 = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      newArray2.splice(index2, 1);

      return tassign(state, { posts: newArray2 });*/

    default:
      return state;
  }
}
