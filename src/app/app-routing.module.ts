import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/components/home-page/home-page.component";
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {LoginComponent} from "./core/components/authentication/login/login.component";
import {CropManageComponent} from "./components/components/crop-manage/crop-manage.component";
import {PredictAnlyComponent} from "./components/components/predict-anly/predict-anly.component";
import {WeatherForeComponent} from "./components/components/weather-fore/weather-fore.component";
import {FinanceMgtComponent} from "./components/components/finance-mgt/finance-mgt.component";
import {ColabFnCComponent} from "./components/components/colab-fn-c/colab-fn-c.component";
import {MarketPlaceComponent} from "./components/components/market-place/market-place.component";
import {
  UserProfileComponent
} from "./core/components/dashboard/components/top-bar/components/user-profile/user-profile.component";
import {UserPComponent} from "./components/components/user-p/user-p.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, },
  {path:'dashboard',component:DashboardComponent,children:[
      {path:'',component:HomePageComponent,canActivate: [AuthGuard] },
      {path:'homepage',component:HomePageComponent,canActivate: [AuthGuard] },
      {path: 'cropmgt', component: CropManageComponent,canActivate: [AuthGuard] },
      {path: 'predict', component: PredictAnlyComponent,canActivate: [AuthGuard] },
      {path: 'weather', component: WeatherForeComponent,canActivate: [AuthGuard] },
      {path: 'finance', component: FinanceMgtComponent,canActivate: [AuthGuard] },
      {path: 'colabfc', component: ColabFnCComponent,canActivate: [AuthGuard] },
      {path: 'market', component: MarketPlaceComponent,canActivate: [AuthGuard] },
      {path: 'profile', component: UserPComponent,canActivate: [AuthGuard] },

    ]},
  { path: 'shared', loadChildren: () => import('./core/shared/shared.module').then(m => m.SharedModule) },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
