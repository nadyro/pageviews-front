import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectionComponent,
    TablesComponent,
    DateTimeInputComponent,
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PageviewsService, NgSelectConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
