import {NgRedux} from "@angular-redux/store";
import {AppState} from "../Store";
import {PostService} from "../../services/posts/posts.service";
import {Post} from "../../entities/Post";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class PostActions {

  constructor (private ngRedux: NgRedux<AppState>, private postService: PostService) {

  }

  // enums to be used in reducer to switch on type of action
  static ADD_POST: string = "ADD_POST";
  static UPDATE_POST: string = "UPDATE_POST";
  static READ_POSTS: string = "READ_POSTS";
  static DELETE_POST: string = "DELETE_POST";

  addPost(newPost: Post) {
    this.postService.add(newPost).subscribe((res: any) => {

      // res contains the documents id in firebase, so add this as a property to the post object.
      newPost.id = res.name;

      this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
      });
    });
  }

  readPosts() {
    let posts: Post[] = [];

    this.postService.getAll().subscribe((res: any) => {
      // service returns json tree containing all posts -> convert to array
      for (let id in res) {
        res[id].id = id // add id property to every post object
        posts.push(res[id] as Post) // add post to post array
      }

      this.ngRedux.dispatch({
        type: PostActions.READ_POSTS,
        payload: posts
      });
    });
  }

  updatePost(updatedPost: Post) {
    this.postService.update(updatedPost).subscribe(() => {

      this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
      });
    });
  }

  deletePost(postToDelete: Post) {
    this.postService.delete(postToDelete).subscribe(() => {

      this.ngRedux.dispatch({
        type: PostActions.DELETE_POST,
        payload: postToDelete
      });
    });
  }
}
