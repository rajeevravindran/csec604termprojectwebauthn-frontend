# Passwordless Authentication using WebAuthn

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

The backend of this project is written in Django, and can be found [here](https://github.com/rajeevravindran/csec604termprojectwebauthn)

A demo of this project can be found [here](https://csec-604-crypto-term-project.rajeevkr.me/)

## Development server

Run `ng serve` for a dev server. Navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files.

> Note : WebAuthn requires the client be running on HTTPS, so I have generated and included a self signed certificate for Common Name "localhost". When you open the frontend on the browser, ignore the certificate errors. If your development server uses some other origin name, you'll have to generate the certificate accordingly

## Configuration

Edit `proxy.config.json` file to point to localhost Django instance.