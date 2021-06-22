import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../entities/Post';

@Pipe({
  name: 'filterPosts'
})
export class PostsPipe implements PipeTransform {
  transform(posts: Post[], searchParam: string): Post[] {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchParam.toLowerCase())
    );
  }
}
