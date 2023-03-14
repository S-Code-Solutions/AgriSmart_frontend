import { Component } from '@angular/core';
import {LoaderService} from "./core/services/loader.service";
import {Router} from "@angular/router";
import {LoginService} from "./core/services/login.service";

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
    // if (this.authenticationService.verifyLogin()) {
    //   this.router.navigate(['/dashboard']);
    // }else {
    //   this.router.navigate(['/authentication']);
    // }

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
        console.log("res not null")
      }
    })
  }
}
