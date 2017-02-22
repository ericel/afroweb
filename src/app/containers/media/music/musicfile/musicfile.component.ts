import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../../shared/services/media/media.service'
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { PageService } from '../../../../shared/services/page/page.service';
import { StatusService } from '../../../../shared/services/status/status.service';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from 'ng2-meta/src';
@Component({
  selector: 'app-musicfile',
  templateUrl: './musicfile.component.html',
  styleUrls: ['./musicfile.component.css']
})
export class MusicfileComponent implements OnInit {
playing: boolean = false;
sources:Array<Object>;
id; auth; page; pageOk: boolean = false;
  constructor(
    private _mediaService: MediaService,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private _pageService: PageService,
    private _metaService: MetaService,
    private _statusService: StatusService
  ) { 

  }

  ngOnInit() {
   this.route.params.subscribe(params => {
        this.id = params['mid'];
     this._pageService.getPage(this.id).subscribe(page =>  {this.page = page;
      if(this.page){
            this.pageOk = true;  
     } 
     });
     this._mediaService.getAudio(this.id).subscribe(sources => {
       //this.metaService.setTag('og:image',this.product.imageURL);
        this._metaService.setTitle(sources.filename);
        this._authService.userById(sources.uid).subscribe(auth => {this.auth = auth; 
        this.sources = [
          {
            mid: sources.mid,
            avatar: auth.avatar,
            uid: sources.uid,
            filename: sources.filename,
            name: auth.name,
            username: auth.username,
            createdAt: sources.createdAt,
            src: sources.src,
            type: sources.type,
            country: sources.country
          }
        ]
        });
     });
   });
  }

 showLove(status) {
    this._statusService.rateStatus(status);
}

createRange(len=32) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
}
