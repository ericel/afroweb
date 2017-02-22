import { Component, OnInit, Attribute } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-authcard',
  template: `
  <div class="mar-10"></div>
  
  <md-card
 *ngIf="isAuthorized"
 class="animated shake">
         <md-card-header>
            <img md-card-avatar src="{{ user.auth.photoURL }}" alt="{{ user.auth.displayName }}">
            <md-card-title><a routerLink="/user/{{ user.uid }}/{{user.auth.displayName | slugify}}">Hi {{user.auth.displayName}}</a></md-card-title>
            <md-card-subtitle><em>{{date | date: format}}</em></md-card-subtitle>
         </md-card-header>
       
   </md-card>
 <md-card
 *ngIf="!isAuthorized"
 class="animated shake">
         <md-card-header>
            <img md-card-avatar src="./assets/img/user-avatar.png">
            <md-card-title><a routerLink="/authentication">Sign Up Or Log in</a></md-card-title>
            <md-card-subtitle><em>Idonsuffer is Awesome!</em></md-card-subtitle>
         </md-card-header>
   </md-card>
   
  `,
  styles: [`

  .card-links i{
    margin-right: 5px;
  }
  .list-group-item {
    border: none !important;
    padding: 0.5rem 0.5rem !important;
    }
    md-card-header {
    display: flex;
    flex-direction: row;
    height: 40px;
    margin: -8px 0 0px !important;
   }
 
   
  `]
})
export class AuthCard implements OnInit {
 isAuthorized: boolean = false;
 user; date;  format;
  constructor(
    private _authService: AuthService,
    //@Attribute("format") format
  ) { 
    this.format = 'yMMMdjms';
    this.date =  new Date();

     setInterval(() => {
        this.date =  new Date();
     }, 1000);
  }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }

}
