import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from 'src/app/models/response.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent {
  form: FormGroup;
  userName: string | null = null;

  constructor(
    private builder: FormBuilder,
    private articleService: ArticleService,
    private auth: AuthService,
    private notification: NotificationService
  ) {
    this.userName = this.auth.getUserName();
    this.form = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.builder.group({
      title: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ),
      content: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10000),
        ])
      ),
      author: [this.userName],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.articleService
        .create(this.form.value)
        .subscribe((res: IResponse) => {
          if (res.status === 1) {
            this.notification.successMessage(res);
          } else {
            this.notification.errorMessage(res);
          }
        });
      this.clearForm();
    } else {
      this.notification.invalidFieldsMessage();
    }
  }

  clearForm() {
    this.form.reset({ author: this.userName });
    this.form.markAsUntouched();
  }
}
