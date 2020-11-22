import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromByteArray } from 'base64-js';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebauthnService {

  constructor(private http: HttpClient) { }

  startWebauthnRegister(username: string, userDisplayName: string): Observable<PublicKeyCredentialCreationOptions> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('user_display_name', userDisplayName);
    return this.http.post<PublicKeyCredentialCreationOptions>('/webauthn/register_webauthn_user', formData)
      .pipe(tap(response => {
        console.log(response);
        response.challenge = Uint8Array.from(atob((response.challenge as unknown as string)
          .replace(/\_/g, '/')
          .replace(/\-/g, '+')), c => c.charCodeAt(0));
        response.user.id = Uint8Array.from(atob((response.user.id as unknown as string)
          .replace(/\_/g, '/')
          .replace(/\-/g, '+')), c => c.charCodeAt(0));
      })
      );
  }

  verifyWebAuthnRegister(signedCredentials: Credential | null): Observable<any> {
    console.log(signedCredentials);
    const formData = new FormData();
    formData.append('signedCredentials', JSON.stringify(this.convertRegistrationAssertion(signedCredentials)));
    return this.http.post('/webauthn/verify_register_webauthn_user', formData);
  }

  startWebAuthnLoginAttestation(username: string): Observable<PublicKeyCredentialRequestOptions> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    return this.http.post<PublicKeyCredentialRequestOptions>('/webauthn/login_webauthn_user_begin_assertion', formData)
      .pipe(tap(response => {
        console.log(response);
        response.challenge = Uint8Array.from(atob((response.challenge as unknown as string)
          .replace(/\_/g, '/')
          .replace(/\-/g, '+')), c => c.charCodeAt(0));
        if (response.allowCredentials) {
          response.allowCredentials[0].id = Uint8Array.from(atob((response.allowCredentials[0].id as unknown as string)
            .replace(/\_/g, '/')
            .replace(/\-/g, '+')), c => c.charCodeAt(0));
        }
      })
      );
  }

  verifyWebAuthnLoginAttestation(loginAssertion: Credential | null): Observable<any> {
    console.log(loginAssertion);
    const formData = new FormData();
    formData.append('signedAssertionCredentials', JSON.stringify(this.convertLoginAssertion(loginAssertion)));
    return this.http.post('/webauthn/login_webauthn_user_assertion_verify', formData);
  }

  convertRegistrationAssertion(newAssertion: any): any {
    const attObj = new Uint8Array(
      newAssertion.response.attestationObject);
    const clientDataJSON = new Uint8Array(
      newAssertion.response.clientDataJSON);
    const rawId = new Uint8Array(
      newAssertion.rawId);

    const registrationClientExtensions = newAssertion.getClientExtensionResults();

    const toReturn = {
      id: newAssertion.id,
      rawId: this.customb64encode(rawId),
      type: newAssertion.type,
      attObj: this.customb64encode(attObj),
      clientData: this.customb64encode(clientDataJSON),
      registrationClientExtensions: JSON.stringify(registrationClientExtensions)
    };
    console.log(toReturn);
    return toReturn;
  }

  convertLoginAssertion(loginAssertion: any): any {
    const authData = new Uint8Array(loginAssertion.response.authenticatorData);
    const clientDataJSON = new Uint8Array(loginAssertion.response.clientDataJSON);
    const rawId = new Uint8Array(loginAssertion.rawId);
    const sig = new Uint8Array(loginAssertion.response.signature);
    const assertionClientExtensions = loginAssertion.getClientExtensionResults();

    return {
      id: loginAssertion.id,
      rawId: this.customb64encode(rawId),
      type: loginAssertion.type,
      authData: fromByteArray(authData).replace(/\+/g, '-').replace(/\//g, '_'),
      clientData: fromByteArray(clientDataJSON).replace(/\+/g, '-').replace(/\//g, '_'),
      signature: Array.from(sig).map((t: number) => ('0' + t.toString(16)).substr(-2)).join(''), // Encoding buffer to hex
      assertionClientExtensions: JSON.stringify(assertionClientExtensions)
    };

  }

  customb64encode(buffer: any): any {
    return fromByteArray(buffer)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

}
