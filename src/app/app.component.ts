import { Component } from '@angular/core';
import {LoaderService} from "./core/services/loader.service";
import {Router} from "@angular/router";
import {LoginService} from "./core/services/login.service";
import * as Notiflix from "notiflix";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agriApp';
  showAnime= false;
  routlet= false;

  constructor(private animeService:LoaderService,private authenticationService:LoginService,
              private router:Router) {

  }

  ngOnInit(): void {
    this.getAnime()
  }

  getAnime(){
    this.showAnime = true
    this.routlet = false
    this.animeService.getProductDetails().subscribe(res=>{
      this.showAnime = true
      if (res!=null){
        this.showAnime = false
        this.routlet = true
        console.log("appcomponent.ts not null")
      }else{
        this.showAnime = false
        this.routlet = false
        console.log("appcomponent.ts null")
      }
    },error => {
      console.log(error)
      this.showAnime = false
      this.routlet = false
      console.log("appcomponent.ts null")
      Notiflix.Report.failure('Error',
        '"appcomponent.ts null"',
        'Okay');
    })
  }
}
