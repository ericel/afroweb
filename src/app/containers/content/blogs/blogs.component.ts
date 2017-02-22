import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../shared/services/page/page.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
promopages=[];
promopagesOk: boolean = false;
  constructor(
    private _pageService: PageService
  ) { }

  ngOnInit() {
    this._pageService.getBlogs()
    .subscribe(pages => { this.promopages = pages; 
      if(pages){
        this.promopagesOk = true;
      }
        this.promopages.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        });
        this.promopages = this.promopages.filter(function(a) {
            return a.status === "Published";
        });
    
    });
  }

createRange(len=30) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
}
