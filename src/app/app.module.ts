import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LeftSideNavBarComponent } from './core/components/dashboard/components/left-side-nav-bar/left-side-nav-bar.component';
import { TopBarComponent } from './core/components/dashboard/components/top-bar/top-bar.component';
import { ClientComponent } from './core/components/dashboard/components/top-bar/components/client/client.component';
import { UserProfileComponent } from './core/components/dashboard/components/top-bar/components/user-profile/user-profile.component';
import { LoginComponent } from './core/components/authentication/login/login.component';
import { ApprovelDialogComponent } from './core/components/dialogs/approvel-dialog/approvel-dialog.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { HomePageComponent } from './components/components/home-page/home-page.component';
import { CropManageComponent } from './components/components/crop-manage/crop-manage.component';
import { PredictAnlyComponent } from './components/components/predict-anly/predict-anly.component';
import { WeatherForeComponent } from './components/components/weather-fore/weather-fore.component';
import { FinanceMgtComponent } from './components/components/finance-mgt/finance-mgt.component';
import { ColabFnCComponent } from './components/components/colab-fn-c/colab-fn-c.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CookieModule} from "ngx-cookie";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import {CarouselModule} from "ngx-owl-carousel-o";
import {DataTablesModule} from "angular-datatables";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import { CRecommendComponent } from './components/components/predict-anly/crop/c-recommend/c-recommend.component';
import { CResultComponent } from './components/components/predict-anly/crop/c-result/c-result.component';
import { FRecommendComponent } from './components/components/predict-anly/fertilizer/f-recommend/f-recommend.component';
import { FResultComponent } from './components/components/predict-anly/fertilizer/f-result/f-result.component';
import {DatePipe} from "@angular/common";
import { OtpscreenComponent } from './core/components/authentication/otpscreen/otpscreen.component';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "./core/shared/shared.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {NgCircleProgressModule} from "ng-circle-progress";
import {NgChartsModule} from "ng2-charts";
import { MarketPlaceComponent } from './components/components/market-place/market-place.component';
import {MatBadgeModule} from "@angular/material/badge";
import { DAnalyseComponent } from './components/components/predict-anly/disease/d-analyse/d-analyse.component';
import { DResultComponent } from './components/components/predict-anly/disease/d-result/d-result.component';
import { UserPComponent } from './components/components/user-p/user-p.component';
import { EditTransactionComponent } from './components/components/finance-mgt/components/edit-transaction/edit-transaction.component';
import { DeleteTransactionComponent } from './components/components/finance-mgt/components/delete-transaction/delete-transaction.component';
import { EditComponent } from './components/components/colab-fn-c/components/edit/edit.component';
import { CropDetailsComponent } from './components/components/market-place/components/crop-details/crop-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LeftSideNavBarComponent,
    TopBarComponent,
    ClientComponent,
    UserProfileComponent,
    LoginComponent,
    ApprovelDialogComponent,
    NotFoundPageComponent,
    HomePageComponent,
    CropManageComponent,
    PredictAnlyComponent,
    WeatherForeComponent,
    FinanceMgtComponent,
    ColabFnCComponent,
    CRecommendComponent,
    CResultComponent,
    FRecommendComponent,
    FResultComponent,
    OtpscreenComponent,
    MarketPlaceComponent,
    DAnalyseComponent,
    DResultComponent,
    UserPComponent,
    EditTransactionComponent,
    DeleteTransactionComponent,
    EditComponent,
    CropDetailsComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        FontAwesomeModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        CookieModule.forRoot(),
        HttpClientModule,
        MatDialogModule,
        CarouselModule,
        DataTablesModule,
        MatTableModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule,
        MatPaginatorModule,
        MatTabsModule,
        MatCardModule,
        MatCheckboxModule,
        FormsModule,
        MatSnackBarModule,
        MatSelectModule,
        SharedModule,
        MatProgressBarModule,
        MaterialFileInputModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: "#78C000",
            innerStrokeColor: "#C7E596",
            animationDuration: 300
        }),
        NgChartsModule,
        MatBadgeModule
    ],
  providers: [DatePipe,StompService,
    {
      provide: StompConfig,
      useValue: {
        url: 'ws://localhost:8080/notify-websocket',
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
        reconnectDelay: 5000,
        debug: true
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
