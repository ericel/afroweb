import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';
import { AdsenseModule } from 'ng2-adsense';
import {MomentModule} from 'angular2-moment';
import { AuthService } from './../../shared/services/auth/auth.service';
import { SimpleTinyCard } from './../../shared/components';
import { SharedModule } from './../../shared/shared.module';
import { AddComponent } from './add/add.component';
import { BlogComponent } from './add/blog/blog.component';
import { ContentpageComponent } from './contentpage/contentpage.component';
import { ContentblogComponent } from './contentpage/contentblog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { Routes, RouterModule } from '@angular/router';
import { EditblogComponent } from './add/blog/editblog/editblog.component';
import { LinkyModule } from 'angular2-linky';
const routes: Routes = [
{ path: 'add', component: AddComponent,
    data: {
       meta: {
        title: 'Add Content',
        description: 'One place web from mama Africa. Afro music, videos, blogs, news. All in one place.',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
 { path: 'add/blog', component: BlogComponent,
  canActivate: [AuthService],
    data: {
       meta: {
        title: 'Write a blog',
        description: 'Write a blog'
       }
    }
 },
 { path: 'stories', component: BlogsComponent,
    data: {
       meta: {
        title: 'Add Content',
        description: 'Africa News Today',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
  {
   path: 'content/_blog/:string/:bid/:string',
   component: ContentblogComponent
  },
  {
   path: '_blog/editblog/:bid/:string',
   component: EditblogComponent,
   canActivate: [AuthService],
    data: {
       meta: {
        title: 'Edit Blog',
        description: 'Edit a blog'
       }
    }
  },
   {
   path: 'content/:string/:id/:string',
   component: ContentpageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MaterialModule.forRoot(),
     NgPipesModule,
    MaterialModule.forRoot(),
     AdsenseModule.forRoot({
      adClient: 'ca-pub-2243338195594977',
      adSlot: 7979162777
    }),
    SharedModule,
    MomentModule,
    MasonryModule,
    LinkyModule
  ],
  declarations: [
    AddComponent,
    BlogComponent,
    ContentpageComponent,
    ContentblogComponent,
    BlogsComponent,
    SimpleTinyCard,
    EditblogComponent
  ]
})
export class ContentModule { }
