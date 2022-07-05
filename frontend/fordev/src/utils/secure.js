import CryptoJS from 'crypto-js';
import { SALT } from '../env';

const salt = SALT;
export const encryptData = (data, item = salt) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), item).toString();

export const decryptData = (ciphertext, data = salt) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, data);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};
