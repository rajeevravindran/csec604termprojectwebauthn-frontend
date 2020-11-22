import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebAuthnProfile } from 'src/interfaces/webauthn';
import { RegisterSuccessComponent } from '../register-success/register-success.component';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegisterSuccessComponent>, @Inject(MAT_DIALOG_DATA) public data: WebAuthnProfile) { }

  ngOnInit(): void {
  }

}
