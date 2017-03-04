import { Component, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
sources:Array<Object>;
api: VgAPI;
playing: boolean = false;
  constructor() { }
 onPlayerReady(api:VgAPI) {
        this.api = api;
        this.api = api;
        
		 this.api.getDefaultMedia().subscriptions.ended.subscribe(
				() => {
				  this.playing = false;
				}
		);

  }
  ngOnInit() {
    this.sources = [
            {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3"
            }
        ];
  }

}
