import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../entities/Post';
import { PostActions } from '../../store/actions/PostActions';
import { AppState, PostState } from '../../store/Store';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  postClicked: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = ['title', 'created', 'type', 'status','edit'];

  constructor(private router: Router, private postActions: PostActions, private ngRedux: NgRedux<AppState>) {}

  ngOnInit(): void {
    this.ngRedux.select(state => state.posts).subscribe(res => {res?.posts ? this.posts = res.posts : this.posts = []})

  }

  editPost(id: any) {
    this.postClicked.emit(id);

    this.router.navigate(['edit-post', {myId: id}])
  }
}
