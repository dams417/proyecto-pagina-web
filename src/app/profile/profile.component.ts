import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

// Interfaz para definir la estructura de una publicación
interface Post {
  id: number;
  comment: string;
  media: {
    file: File | null;
    previewUrl: SafeResourceUrl | null;
    type: 'image' | 'video' | null;
  };
  timestamp: Date;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  
  // Nueva propiedad para almacenar publicaciones
  posts: Post[] = [];

  newPost = {
    comment: '',
    media: null as File | null,
  };
  previewUrl: SafeResourceUrl | null = null;
  fileType: 'image' | 'video' | null = null;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      
      // Cargar publicaciones guardadas en localStorage
      const savedPosts = localStorage.getItem('userPosts');
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts).map((post: Post) => ({
          ...post,
          media: {
            ...post.media,
            previewUrl: this.sanitizer.bypassSecurityTrustResourceUrl(post.media.previewUrl as string)
          }
        }));
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Método para editar perfil
  editProfile() {
    this.router.navigate(['/profile-edit']);
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Sanitize the URL
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        
        // Determine file type
        if (file.type.startsWith('image/')) {
          this.fileType = 'image';
        } else if (file.type.startsWith('video/')) {
          this.fileType = 'video';
        } else {
          this.fileType = null;
        }
      };
      reader.readAsDataURL(file);
      this.newPost.media = file;
    }
  }

  // Getter para verificar si es una imagen
  get isImagePreview(): boolean {
    return this.fileType === 'image';
  }

  // Getter para verificar si es un video
  get isVideoPreview(): boolean {
    return this.fileType === 'video';
  }

  postComment() {
    console.log('Método postComment llamado');
    console.log('Comentario:', this.newPost.comment);
    console.log('Media:', this.newPost.media);
    console.log('Preview URL:', this.previewUrl);
    console.log('File Type:', this.fileType);
  
    // Modificamos la condición para incluir específicamente la imagen
    if (this.newPost.comment || (this.newPost.media && this.fileType)) {
      console.log('Condición de publicación cumplida');
      
      // Crear una nueva publicación
      const newPostEntry: Post = {
        id: this.posts.length + 1,
        comment: this.newPost.comment || '', // Aseguramos que siempre haya un string
        media: {
          file: this.newPost.media,
          previewUrl: this.previewUrl,
          type: this.fileType
        },
        timestamp: new Date()
      };
  
      console.log('Nueva publicación:', newPostEntry);
  
      // Agregar la publicación al inicio del array
      this.posts.unshift(newPostEntry);
  
      // Guardar en localStorage
      localStorage.setItem('userPosts', JSON.stringify(this.posts.map(post => ({
        ...post,
        media: {
          ...post.media,
          previewUrl: post.media.previewUrl?.toString()
        }
      }))));
  
      // Limpiar el formulario y la previsualización
      this.newPost.comment = '';
      this.newPost.media = null;
      this.previewUrl = null;
      this.fileType = null;
    } else {
      console.log('No hay comentario ni media para publicar');
      alert('Por favor, ingresa un comentario o selecciona un archivo para publicar.');
    }
  }

  // Método para eliminar una publicación
  deletePost(postId: number) {
    this.posts = this.posts.filter(post => post.id !== postId);
    
    // Actualizar localStorage
    localStorage.setItem('userPosts', JSON.stringify(this.posts.map(post => ({
      ...post,
      media: {
        ...post.media,
        previewUrl: post.media.previewUrl?.toString()
      }
    }))));
  }
}