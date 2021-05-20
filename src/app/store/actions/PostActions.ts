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

  }

  readPosts() {

  }

  updatePost(updatedPost: Post) {

  }
}
