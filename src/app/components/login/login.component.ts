import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() goToLoginEvent: EventEmitter<any> = new EventEmitter<any>();
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  errorMessage: string;
  constructor(private loginService: LoginService) { }
  goToSignin() {
    this.goToLoginEvent.emit('0');
  }
  onSubmit() {
    const user = new User();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;
    this.loginService.submitLogin(user).subscribe(rs => {
      if (rs.object === null) {
        this.errorMessage = rs.message;
      }
    });
  }
  ngOnInit() {
  }

}
