import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './interceptors/http.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterSuccessComponent } from './dialogs/register-success/register-success.component';
import { LoginSuccessComponent } from './dialogs/login-success/login-success.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterSuccessComponent,
    LoginSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
