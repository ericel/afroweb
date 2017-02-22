import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music/music.component';
import {  UploadComponent } from './upload/upload.component'
import { Routes, RouterModule } from '@angular/router';
import { MasonryModule } from 'angular2-masonry';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../shared/services/auth/auth.service';
import { MusicfileComponent } from './music/musicfile/musicfile.component';
const routes: Routes = [
{ path: 'music', component: MusicComponent,
    data: {
       meta: {
        title: 'Best Of African Music',
        description: 'African Music Online',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
 { path: 'media/upload', component: UploadComponent,
 canActivate: [AuthService],
    data: {
       meta: {
        title: 'Share your Africa Music Online',
        description: 'Share your Africa Music Online',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
  {
   path: 'music/audio/:mid/:string',
   component:  MusicfileComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MasonryModule,
    MaterialModule.forRoot(),
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [
    MusicComponent,
    UploadComponent,
    MusicfileComponent
  ]
})
export class MediaModule { }
