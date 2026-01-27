import crypto from "crypto";
import {config} from "../config/config.js";

const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(
        config.token.userToken.algorithm,
        Buffer.from(config.token.userToken.secret, 'hex'),
        iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
        config.token.userToken.algorithm,
        Buffer.from(config.token.userToken.secret, 'hex'),
        iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export {
    encrypt,
    decrypt,
}