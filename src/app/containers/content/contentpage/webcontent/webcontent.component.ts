import { Component,  OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { PageService } from '../../../../shared/services/page/page.service';
import { StatusService } from '../../../../shared/services/status/status.service';
import { MetaService } from 'ng2-meta/src';
@Component({
  selector: 'app-webcontent',
  templateUrl: './webcontent.component.html',
  styleUrls: ['./webcontent.component.css']
})
export class WebcontentComponent implements OnInit{
wid: string;
webpage: any;promowebpages = [];
auth: any;
webcontentOk: boolean = false;
webauthOk: boolean = false;
isAuthorized: boolean = false;
user;webpageslike;
comments: any;
webpageBlg: any;
isBlog: boolean = false;
sub: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _pageService: PageService,
    private _statusService: StatusService,
    private metaService: MetaService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params['wid']){
         this.wid = params['wid'];
      }
        this._pageService.getPage(this.wid).subscribe(page =>  {this.webpage = page;});
        this._pageService.getWebPage(this.wid).subscribe(pageBlg =>  {this.webpageBlg = pageBlg; 
          this.metaService.setTitle(this.webpageBlg.blogTitle);
          if(this.webpageBlg){
            this.webcontentOk = true;  
          } else {
             this.router.navigate(['/notfound404']);
          }
        this._authService.userById(this.webpageBlg.uid).subscribe(auth => {this.auth = auth;
           if(this.auth){
            this.webauthOk = true;
          }
         
          this.metaService.setTag('author', this.auth.name);
        });

     
      // this._statusService.getComments(this.wid).subscribe(comments => this.comments = comments); 

    this._pageService.getBlogs()
    .subscribe(webpages => {  
        this.promowebpages = webpages.filter(function(a){
            return a.status !== "draft";
        });
        this.promowebpages.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        });

        this.webpageslike = this.promowebpages.filter(function(a){
            return a.blogCat === pageBlg.blogCat && a.pid !== pageBlg.pid;
        });
    
    });
  
  });
 });

  this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value; } 
     else {this.isAuthorized = false} });
  }


}
