import { Component, OnInit, Input, EventEmitter, Output, Directive, ElementRef, Pipe, OnChanges, Sanitizer, SecurityContext,
  SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { PageService } from '../../../shared/services/page/page.service';
import { StatusService } from '../../../shared/services/status/status.service';
import { MetaService } from 'ng2-meta/src';


@Component({
  selector: 'app-page-blog',
  templateUrl: './page.blog.component.html',
  styleUrls: ['./contentpage.component.css']
})
// Sets the element's innerHTML to a sanitized version of [safeHtml]
//@Pipe({name: 'safeHtml'})
export class ContentblogComponent implements OnInit {
@Input() safeHtml: string;
@Input() status = {};
@Output() checked = new EventEmitter();
id: string;
page: any;promopages = [];
auth: any;
isAuthorized: boolean = false;
user;
pageOk: boolean = false;
authOk: boolean = false;
comments: any;
pageBlg: any;
pageslike: any;
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
        this.id = params['bid'];
        let str = params['string'];
        
        this._pageService.getPage(this.id).subscribe(page =>  {this.page = page;});
        this._pageService.getPageBlg(this.id).subscribe(pageBlg =>  {this.pageBlg = pageBlg; 
          this.metaService.setTitle(this.pageBlg.blogTitle);
          if(this.pageBlg){
            this.pageOk = true;  
          } else {
             this.router.navigate(['/notfound404']);
          }
        this._authService.userById(this.pageBlg.uid).subscribe(auth => {this.auth = auth;
           if(this.auth){
            this.authOk = true;
          }
         
          this.metaService.setTag('author', this.auth.name);
        });

     
       this._statusService.getComments(this.id).subscribe(comments => this.comments = comments); 
   


  this._pageService.getBlogs()
    .subscribe(pages => {  
        this.promopages = pages.filter(function(a){
            return a.status !== "draft";
        });
        this.promopages.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        });

        this.pageslike = this.promopages.filter(function(a){
            return a.blogCat === pageBlg.blogCat && a.pid !== pageBlg.pid;
        });
    
    });
  });
 });
    this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value;} 
     else {this.isAuthorized = false} });
    
  }
  
   ngOnChanges(changes: SimpleChanges): any {
    if ('safeHtml' in changes) {
      this.elementRef.nativeElement.innerHTML =
        this.sanitizer.sanitize(SecurityContext.HTML, this.safeHtml);
    }
  }
  
 showLove(status) {
    this._statusService.rateStatus(status);
  }
}


