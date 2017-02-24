import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { AdsenseModule } from 'ng2-adsense';
import {MomentModule} from 'angular2-moment';
import { MasonryModule } from 'angular2-masonry';


import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
    { path: '', component: HomeComponent,
    data: {
       meta: {
        title: 'Africa #1 Website!',
        description: 'One place web from mama Africa. Afro music, videos, blogs, news. All in one place.',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
 {
   path: 'search/:string',
   component:  SearchComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    FormsModule, ReactiveFormsModule,
    NgPipesModule,
    MaterialModule.forRoot(),
     AdsenseModule.forRoot({
      adClient: 'ca-pub-2243338195594977',
      adSlot: 7979162777
    }),
    MomentModule,
    SharedModule,
    MasonryModule
 
  ],
  declarations: [
    HomeComponent,
    SearchComponent
    ]
})
export class HomeModule { }
