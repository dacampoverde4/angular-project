import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;

  captchaImg: SafeResourceUrl;
  log: number;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private sanitization: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      captcha: [, Validators.required],
      log: [, Validators.required],
    });

    this.getCaptcha();
  }

  serverError: boolean = false;
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((res) => {
        if (res.errorCode === 0 && res.result) {
          this.tokenService.set(res.result[0].token);
          this.authService.setLoggedIn(true);
          this.authService.setCurrentUser(res.result[0]);
          this.toastr.success('Login Successful');
          this.router.navigate(['/']);
        } else if (res.errorCode === 1) {
          this.serverError = true;
          this.errorMsg = res.errorDescription;
          this.getCaptcha();
        }
        console.log(res);
      });
    } else {
      console.log(this.loginForm);
      if (this.userName.errors && this.userName.errors.required) {
        this.errorMsg = 'Username is empty';
      } else if (this.password.errors && this.password.errors.required) {
        this.errorMsg = 'Password is empty';
      } else if (this.captcha.errors && this.captcha.errors.required) {
        this.errorMsg = 'Captcha is empty';
      }
      // this.errorMsg = this.loginForm.getError();
    }
  }

  getCaptcha() {
    this.authService
      .getCaptcha()
      .subscribe((res: { img: string; log: number }) => {
        this.captchaImg = this.sanitization.bypassSecurityTrustResourceUrl(
          'data:image/jpeg;base64,' + res.img
        );
        this.loginForm.get('log').setValue(res.log);
      });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get captcha() {
    return this.loginForm.get('captcha');
  }
}
