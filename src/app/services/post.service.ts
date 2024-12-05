import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts = JSON.parse(localStorage.getItem('posts') || '[]');

  getPosts() {
    return this.posts.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  addPost(post: any) {
    this.posts.push(post);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }
}
