import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignInComponent} from './components/signin/sign-in.component';
import {LoginComponent} from './components/login/login.component';
import {LandingComponent} from './components/landing/landing.component';
import {AuthGuard} from './service/auth.guard';
import {AppComponent} from './app.component';
import {ImprovalComponent} from './components/improval/improval.component';
import {TensionPointsComponent} from './components/tension-points/tension-points.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileInfosComponent} from './components/profile/profile-infos/profile-infos.component';
import {ProfilePageviewsComponent} from './components/profile/profile-pageviews/profile-pageviews.component';


const routes: Routes = [
  {
    path: '', component: LandingComponent,
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: SignInComponent
  },
  {
    path: 'sign-in', component: LoginComponent
  },
  {
    path: 'improval', component: ImprovalComponent, canActivate: [AuthGuard]
  },
  {
    path: 'tension-points', component: TensionPointsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
      {path: 'pageviews', component: ProfilePageviewsComponent, canActivate: [AuthGuard]},
      {path: 'infos', component: ProfileInfosComponent, canActivate: [AuthGuard]},
    ]
  },
  {
    path: '**', component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
