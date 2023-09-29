import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from 'src/app/models/response.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  response: IResponse = {
    status: 0,
    code: 0,
    message: '',
    data: {
      token: '',
    },
  };

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.form = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.builder.group({
      email: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
        ])
      ),
      password: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ])
      ),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((res: IResponse) => {
        if (res.status === 1) {
          sessionStorage.setItem('token', res.data.token);
          this.authService.isAuthorized.next(true);
          this.notification.successMessage(res);

          this.clearForm();
          this.router.navigate(['']);
        } else {
          this.notification.errorMessage(res);
          this.authService.isAuthorized.next(false);
        }
      });
    } else {
      this.notification.invalidFieldsMessage();
      this.authService.isAuthorized.next(false);
    }
  }

  clearForm() {
    this.form.reset();
    this.form.markAsUntouched();
  }
}