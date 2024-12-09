import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css'],
  standalone: true,
  imports:[
    NgFor,
    DatePipe,

  ]
})
export class PostFeedComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.posts = this.postService.getPosts();
  }

  addPost() {
    const newPost = {
      title: 'Nueva publicación',
      content: 'Contenido de prueba',
      timestamp: new Date(), // Esto ya es una fecha válida
    };
  }
}
