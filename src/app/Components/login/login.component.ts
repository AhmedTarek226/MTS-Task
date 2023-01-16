import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/Models/user-login';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required]),
    });
  }

  login() {
    let user = this.loginForm.value as UserLogin;
    // console.log(user.userName);
    // console.log(user.userPass);
    this.authService.login(user).subscribe((data) => {
      if (data) {
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data.userConfirmToken));
        this.router.navigateByUrl('/Home');
      } else {
        alert('Invalid Data!!');
      }
    });
  }
}
