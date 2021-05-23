import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() goToLoginEvent: EventEmitter<any> = new EventEmitter<any>();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
  });
  errorMessage: string;
  constructor(private loginService: LoginService) { }
  goToLogin() {
    this.goToLoginEvent.emit('1');
  }
  onSubmit() {
    const user = new User();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;
    user.userName = this.loginForm.value.username;
    this.loginService.submitSignIn(user).subscribe(rs => {
      if (rs.object === null) {
        this.errorMessage = rs.message;
      }
    });
  }
  ngOnInit() {
  }

}
