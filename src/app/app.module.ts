import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageviewsService} from './service/pageviews.service';
import {HttpClientModule} from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
import { SelectionComponent } from './components/selection/selection.component';
import { TablesComponent } from './components/tables/tables.component';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';
import { SignInComponent } from './components/signin/sign-in.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderOnlineComponent } from './components/header-online/header-online.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { ImprovalComponent } from './components/improval/improval.component';
import { TensionPointsComponent } from './components/tension-points/tension-points.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { MatSliderModule } from '@angular/material/slider';
import { ProfileComponent } from './components/profile/profile.component';
import {ProfileService} from './service/profile.service';
import { ProfileInfosComponent } from './components/profile/profile-infos/profile-infos.component';
import { ProfilePageviewsComponent } from './components/profile/profile-pageviews/profile-pageviews.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectionComponent,
    TablesComponent,
    DateTimeInputComponent,
    SignInComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HeaderOnlineComponent,
    LandingComponent,
    ImprovalComponent,
    TensionPointsComponent,
    IdeasComponent,
    ProfileComponent,
    ProfileInfosComponent,
    ProfilePageviewsComponent,
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PageviewsService, NgSelectConfig, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
