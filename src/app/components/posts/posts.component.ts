import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../entities/Post';
import { PostActions } from '../../store/actions/PostActions';
import { AppState, PostState } from '../../store/Store';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  displayedColumns: string[] = ['title', 'created', 'type', 'status','edit'];
  constructor(private router: Router, private postActions: PostActions, private ngRedux: NgRedux<AppState>) {}

  ngOnInit(): void {
    this.postActions.readPosts()
    this.ngRedux.select(state => state.posts).subscribe(res => {res?.posts ? this.posts = res.posts : this.posts = []})
    
  }
}
