import React, { useState } from "react";
import * as openpgp from "openpgp";
import { createWriteStream } from "streamsaver";

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

    const fileToStream = (file) => {
        const blob = new Blob([file], { type: file.type });
        const stream = blob.stream();
        return stream;
    }

    const streamEncryptFile = async (fileToEncrypt) => {

        const fileName = `${file.name}`;

        const readableStream = fileToStream(fileToEncrypt);
        const message = await openpgp.createMessage({ binary: readableStream });

        const encrypted = await openpgp.encrypt({
            message, // input as Message object
            passwords: [password], // multiple passwords possible
            format: 'binary', // don't ASCII armor (for Uint8Array output)
            config: { preferredCompressionAlgorithm: openpgp.enums.compression.zlib } // compress the data with zlib
        });

        const writableStream = createWriteStream(fileName);
        encrypted.pipeTo(writableStream).then(() => console.log("Done writing encrypted file ..."));

    }

    const streamDecryptFile = async (fileToDecrypt) => {

        const fileName = `${file.name}`;

        const readableStream = fileToStream(fileToDecrypt);
        const message = await openpgp.readMessage({ binaryMessage: readableStream });

        const decrypted = await openpgp.decrypt({
            message, // input as Message object
            passwords: [password], // multiple passwords possible
            format: 'binary', // don't ASCII armor (for Uint8Array output)
            //config: {allowUnauthenticatedStream: true }
            config: { allowUnauthenticatedStream: true, preferredCompressionAlgorithm: openpgp.enums.compression.zlib } // compress the data with zlib

        });

        const writableStream = createWriteStream(fileName);
        decrypted.data.pipeTo(writableStream).then(() => console.log("Done writing decrypted file ..."));

    }

    const webStreamToBlob = async (webStream) => {
        try {
            const reader = webStream.getReader();
            //const reader = webStream.getReader({ chunkSize: 1 * 1024 * 1024 });
            const chunks = [];
            let done, value;
            while (!done) {
                ({ done, value } = await reader.read());
                if (value) {
                    console.log("Chunk Count: ", chunks.length + 1);
                    chunks.push(value);
                }
            }
            const blob = new Blob(chunks, { type: 'application/octet-stream' });
            return blob;
        } catch (error) {
            console.error('Error in coverting to blob:', error);
            //throw new Error('Failed to convert WebStream to Blob.');
        }
    }

    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    const handleEncryptClick = async () => {

        await streamEncryptFile(file);

    };

    const handleDecryptClick = async () => {

        await streamDecryptFile(file);

    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Password" onChange={handlePasswordChange} />
            <button onClick={handleEncryptClick}>Encrypt</button>
            <button onClick={handleDecryptClick}>Decrypt</button>
            <br />
        </div>
    );
};

export default FileEncrypter;
