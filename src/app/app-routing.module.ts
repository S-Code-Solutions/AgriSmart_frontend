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
import {ReportComponent} from "./components/components/report/report.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path:'dashboard',component:DashboardComponent,children:[
      {path:'',component:HomePageComponent},
      {path:'homepage',component:HomePageComponent},
      {path: 'cropmgt', component: CropManageComponent},
      {path: 'predict', component: PredictAnlyComponent},
      {path: 'weather', component: WeatherForeComponent},
      {path: 'finance', component: FinanceMgtComponent},
      {path: 'colabfc', component: ColabFnCComponent},
      {path: 'report', component: ReportComponent},
    ]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
