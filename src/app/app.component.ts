import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { repeat } from 'rxjs/operators';
import { LoginSuccessComponent } from './dialogs/login-success/login-success.component';
import { RegisterSuccessComponent } from './dialogs/register-success/register-success.component';
import { SpinnerService } from './services/spinner.service';
import { WebauthnService } from './services/webauthn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'termprojectwebauthn-frontend';
  username: string;
  displayName: string;
  showSpinner: boolean;

  constructor(public spinnerService: SpinnerService, private webauthnservice: WebauthnService,
              private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.username = '';
    this.displayName = '';
    this.showSpinner = false;
  }

  ngOnInit(): void {
  }

  startWebauthnRegister(): void {
    this.webauthnservice.startWebauthnRegister(this.username, this.displayName)
      .subscribe((response) => {
        navigator.credentials.create({ publicKey: response })
          .then((signedCredentials: Credential | null) => {
            console.log('Signed Credentials');
            console.log(signedCredentials);
            this.webauthnservice.verifyWebAuthnRegister(signedCredentials).subscribe(
              result => {
                console.log(result);
                this.dialog.open(RegisterSuccessComponent, {
                  data: result
                });
              },
              errorResponse => {
                console.log(errorResponse);
                this.snackBar.open(errorResponse.error.error, '', {
                  duration: 3000
                });
              });
          }).catch((err) => {
            console.log('Registration Failed');
            console.log(err);
            this.snackBar.open(err, '', {
              duration: 3000
            });
          });
      }, (error) => {
        console.log('Error response from server when requesting challenge');
        this.snackBar.open('Server Failed to give challenge. Invalid User', '', {
          duration: 3000
        });
      });
  }

  startWebAuthnLogin(): void {
    this.webauthnservice.startWebAuthnLoginAttestation(this.username)
      .subscribe((response) => {
        console.log(response);
        navigator.credentials.get({ publicKey: response }).then(signedLoginCredentials => {
          console.log(signedLoginCredentials);
          this.webauthnservice.verifyWebAuthnLoginAttestation(signedLoginCredentials).subscribe(
            (loginResponse) => {
              console.log(loginResponse);
              this.dialog.open(LoginSuccessComponent, {
                data: loginResponse
              });
            },
            errorResponse => {
              console.log(errorResponse);
              this.snackBar.open(errorResponse.error.error, '', {
                duration: 3000
              });
            });
        });
      }, (error) => {
        console.log('Error response from server when requesting login challenge');
        this.snackBar.open('Server Failed to give login challenge. Invalid User', '', {
          duration: 3000
        });
      });
  }

}
