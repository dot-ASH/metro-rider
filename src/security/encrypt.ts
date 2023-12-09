import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_AES_SECRET;
const shift: number = parseInt(process.env.REACT_APP_SHIFT, 10);
const secretKey: number = parseInt(process.env.REACT_APP_SECRET_KEY, 10);

export const sha256HashPin = (value: string) => {
  try {
    const hash = CryptoJS.SHA256(value).toString();
    return hash;
  } catch (error) {
    console.error("Error hashing the value: ", error);
    throw error;
  }
};

export const aesHashEncrypt = (value: string) => {
  try{
    const hash = CryptoJS.AES.encrypt(value, SECRET_KEY);
    return hash.toString();
  }catch (error){
    console.error("Error Aes hashing the value: ", error);
        throw error;
  }
}

export const aesHashDecrypt = (value: string) => {
  try{
    const hash = CryptoJS.AES.decrypt(value, SECRET_KEY);
    return hash.toString(CryptoJS.enc.Utf8);
  }catch (error){
    console.error("Error Aes hashing the value: ", error);
        throw error;
  }
}

function toText(textNumber: number): string {
  let number = textNumber * secretKey;
  const digitMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let textRepresentation = "";

  while (number > 0) {
    const digit = number % 10;
    textRepresentation = digitMap[digit] + textRepresentation;
    number = Math.floor(number / 10);
  }

  return textRepresentation;
}

function toNumber(text: string): number {
  let result = "";
  const digitMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const arrayLength = digitMap.length;

  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < arrayLength; j++) {
      if (digitMap[j] === text[i]) {
        result += j;
      }
    }
  }

  const finalResult = parseInt(result);
  return Math.abs(Math.floor(finalResult / secretKey));
}

export function encryptHash(textNumber: number): string {
  const text = toText(textNumber);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] === text[i].toUpperCase()) {
      result += String.fromCharCode((text.charCodeAt(i) + shift - 65) % 26 + 65);
    } else {
      result += String.fromCharCode((text.charCodeAt(i) + shift - 97) % 26 + 97);
    }
  }

  return result;
}

export function decryptHash(text: string): number {
  let decypherText = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] === text[i].toUpperCase()) {
      decypherText += String.fromCharCode((text.charCodeAt(i) - shift - 65 + 26) % 26 + 65);
    } else {
      decypherText += String.fromCharCode((text.charCodeAt(i) - shift - 97 + 26) % 26 + 97);
    }
  }

  return toNumber(decypherText);
}
