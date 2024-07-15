import React, { useState } from "react";
import * as openpgp from "openpgp";
import { createWriteStream } from "streamsaver";

import * as streamSaver from "streamsaver";
streamSaver.mitm = "/mitm.html";

const FileEncrypter = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // This function transforms a file into a stream
  const fileToStream = (file) => {
    const blob = new Blob([file], { type: file.type });
    const stream = blob.stream();
    return stream;
  };

  // Encrypt file using openpgp.js
  // This code uses a readableStream and a writableStream to encrypt a file
  // The file is encrypted using zlib compression and a password
  // The encrypted file is written to the local filesystem

  const streamEncryptFile = async (fileToEncrypt) => {
    const fileName = `${file.name}`;

    const readableStream = fileToStream(fileToEncrypt);
    const message = await openpgp.createMessage({ binary: readableStream });

    const encrypted = await openpgp.encrypt({
      message, // input as Message object
      passwords: [password], // multiple passwords possible
      format: "binary", // don't ASCII armor (for Uint8Array output)
      config: { preferredCompressionAlgorithm: openpgp.enums.compression.zlib }, // compress the data with zlib
    });

    const writableStream = createWriteStream(fileName);
    encrypted
      .pipeTo(writableStream)
      .then(() => console.log("Done writing encrypted file ..."));
  };

  // Function to decrypt a file using a password and OpenPGP.js.
  // The input is a file and the output is a decrypted file.
  // The file is streamed and decompressed using zlib.
  // The file is read using a ReadableStream and the output is written using a WritableStream.
  // The ReadableStream is provided by the fileToStream function.
  // The WritableStream is provided by the createWriteStream function.
  // The decrypted data is piped to the WritableStream.

  const streamDecryptFile = async (fileToDecrypt) => {
    const fileName = `${file.name}`;

    const readableStream = fileToStream(fileToDecrypt);
    const message = await openpgp.readMessage({
      binaryMessage: readableStream,
    });

    const decrypted = await openpgp.decrypt({
      message, // input as Message object
      passwords: [password], // multiple passwords possible
      format: "binary", // don't ASCII armor (for Uint8Array output)
      config: {
        allowUnauthenticatedStream: true,
        preferredCompressionAlgorithm: openpgp.enums.compression.zlib,
      }, // compress the data with zlib
    });

    const writableStream = createWriteStream(fileName);
    decrypted.data
      .pipeTo(writableStream)
      .then(() => console.log("Done writing decrypted file ..."));
  };

  const handleEncryptClick = async () => {
    await streamEncryptFile(file);
  };

  const handleDecryptClick = async () => {
    await streamDecryptFile(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <button onClick={handleEncryptClick}>Encrypt</button>
      <button onClick={handleDecryptClick}>Decrypt</button>
      <br />
    </div>
  );
};

export default FileEncrypter;
