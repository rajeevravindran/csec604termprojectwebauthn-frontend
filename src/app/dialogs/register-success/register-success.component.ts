import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebAuthnProfile } from 'src/interfaces/webauthn';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent {

  constructor(public dialogRef: MatDialogRef<RegisterSuccessComponent>, @Inject(MAT_DIALOG_DATA) public data: WebAuthnProfile) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
