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

  addPost(newPost: Post) {
    this.postService.add(newPost)
      .then(res => {
        this.ngRedux.dispatch({
          type: PostActions.ADD_POST,
          payload: newPost
        })
      })
      .catch(err => {
        console.log(err)
      })

/*    this.postService.add(newPost).subscribe((res: any) => {
      this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: res
      })
    })*/
  }

  readPosts() {
    this.postService.getAll().subscribe((res: any) => {

      this.ngRedux.dispatch({
        type: PostActions.READ_POSTS,
        payload: res
      });
    })
  }

  updatePost(updatedPost: Post) {

  }
}
