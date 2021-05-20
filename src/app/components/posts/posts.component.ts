import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../entities/Post';
import { PostService } from '../../services/posts/posts.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  displayedColumns: string[] = ['title', 'created', 'type', 'status','edit'];
  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((posts) => {
      console.log(posts);
      this.posts = posts;
    });
  }
}
