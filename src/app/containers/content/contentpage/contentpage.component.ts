import { Component, OnInit, Input, EventEmitter, Output, Directive, ElementRef, Pipe, OnChanges, Sanitizer, SecurityContext,
  SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { PageService } from '../../../shared/services/page/page.service';
import { StatusService } from '../../../shared/services/status/status.service';
import { MetaService } from 'ng2-meta/src';
@Component({
  selector: 'app-contentpage',
  templateUrl: './contentpage.component.html',
  styleUrls: ['./contentpage.component.css']
})
//@Directive({ selector: '[safeHtml]' });
export class ContentpageComponent implements OnInit, OnChanges {

@Input() safeHtml: string;
@Input() status = {};
@Output() checked = new EventEmitter();
id: string;
page: any;promopages = [];
auth: any;
pageOk: boolean = false;
authOk: boolean = false;
isAuthorized: boolean = false;
user;
comments: any;
pageBlg: any;
isBlog: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _pageService: PageService,
    private _statusService: StatusService,
    private metaService: MetaService,
    private elementRef: ElementRef, private sanitizer: Sanitizer
  ) { }

   ngOnInit() {
     this.route.params.subscribe(params => {
        this.id = params['id'];
        let str = params['string'];
        
        this._pageService.getPage(this.id).subscribe(page =>  {this.page = page; 
            this.metaService.setTitle(this.page.status);
          if(this.page){
            this.pageOk = true;
          }
        this._authService.userById(this.page.uid).subscribe(auth => {this.auth = auth;
           if(this.auth){
            this.authOk = true;
          }
          this.metaService.setTag('author', this.auth.name);
          if(this.page.type !== "Status Update"){
             this.metaService.setTag('author', "Update");
          }
          if(this.page.type !== "Question"){
             this.metaService.setTag('author', "Help Answer");
          }
        });

      });
       this._statusService.getComments(this.id).subscribe(comments => this.comments = comments); 
    });

    this._pageService.getBlogs()
    .subscribe(pages => {
        
        this.promopages = pages.filter(function(a){
            return a.status !== "draft";
        });
        this.promopages.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        });
    });


    this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value; } 
     else {this.isAuthorized = false} });
  
  }
 
  ngOnChanges(changes: SimpleChanges): any {
    if ('safeHtml' in changes) {
      this.elementRef.nativeElement.innerHTML =
        this.sanitizer.sanitize(SecurityContext.HTML, this.safeHtml);
    }
  }

  transform(style) {
   // return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
   
  }
 showLove(status) {
    this._statusService.rateStatus(status);
  }
}


