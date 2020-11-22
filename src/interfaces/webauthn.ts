export interface WebAuthnProfile {
    user: User;
    display_name: string;
    credential_id: string;
    user_public_key: string;
    signature_counter: string;
    webauthn_ukey: string;
}

export interface User {
    username: string;
}
