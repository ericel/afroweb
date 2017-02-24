import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StatusService } from '../../../shared/services/status/status.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
search_term;searches;searchedObj;
statusesOk: boolean = false;
searchHasResults: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private _statusService: StatusService,
  ) { }

  ngOnInit() {
     this.route.params.subscribe(params => {
         this.search_term = params['string'];
         
        const searchedObj = this.findByName(this.search_term);
        if(searchedObj.length > 0){
          this.searchHasResults = true;
          this.searchedObj = searchedObj;
        }

         this._statusService.getStatus()
          .subscribe(searches => { this.searches = searches; 
            if(this.searches){
              this.statusesOk = true; 
         } 
      });
     
     });
  }

  createRange(len=32) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }

 findByName(name) {
      var thisObject = [];
      for (var keys in this.searches) {
        var getThisObject = this.searches[keys];
        if ((getThisObject.status).toLowerCase().indexOf(name) !== -1 ) {
          thisObject.push(this.searches[keys]);
        }
      }
      return thisObject
   }
}
