import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_AES_SECRET;
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
