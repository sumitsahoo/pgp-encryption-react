# PGP Encryption in React using OpenPGP

This repository shows how to integrate file encryption and decryption using OpenPGP standard in React. Here Symmetric encryption is used. Streaming encryption and decryption is used to minimize memory usage by browser. 

## OpenPGP

OpenPGP (Pretty Good Privacy) is a free and open-source encryption standard used to secure email communication, files, and other data. It provides end-to-end encryption, which means that the data is encrypted on the sender's device and can only be decrypted by the intended recipient with their private key. OpenPGP uses public key cryptography to encrypt and decrypt data, and digital signatures to verify the authenticity and integrity of the data. It is widely used by individuals, businesses, and organizations to protect sensitive information and ensure secure communication.

Link: https://www.openpgp.org

## OpenPGP.js

OpenPGPjs is a free and open-source implementation of the OpenPGP encryption standard in JavaScript. It allows developers to integrate OpenPGP encryption and decryption functionality into web applications, making it possible to secure data and communications directly in the browser. OpenPGPjs supports various encryption algorithms and features, such as key management, digital signatures, and message compression. It is designed to work in modern web browsers and can be used in combination with other web technologies, such as React, Angular, and Node.js. OpenPGPjs is widely used in web-based applications that require secure communication and data protection, such as online file sharing, chat applications, and secure email clients.

Library Link: https://github.com/openpgpjs/openpgpjs

## Vite

Vite is a fast build tool and development server for modern web applications, commonly used for Vue.js and React. It features a fast development server with hot module replacement, CSS preprocessing, and automatic asset optimization. Vite supports modern web technologies and can be customized with plugins and middleware. Its focus is on speed, performance, and developer experience.

Link: https://vitejs.dev

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install required dependencies.

```bash
npm install
```

## Usage

```javascript
await streamEncryptFile(file);
await streamDecryptFile(encryptedFile);
```

## Dependencies

- openpgp: ^5.7.0
- react: ^18.2.0
- react-dom: ^18.2.0
- streamsaver: ^2.0.6

## Dev Dependencies

- @openpgp/web-stream-tools: ^0.0.13
- @types/react: ^18.0.28
- @types/react-dom: ^18.0.11
- @vitejs/plugin-react: ^3.1.0
- vite: ^4.2.1

## License

MIT License

Copyright (c) 2023 Sumit Sahoo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
