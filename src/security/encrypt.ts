import CryptoJS from "crypto-js";

export const sha256HashPin = (value: string) => {
  try {
    const hash = CryptoJS.SHA256(value).toString();
    return hash;
  } catch (error) {
    console.error("Error hashing the value:", error);
    throw error;
  }
};

// export const compareSHA = async (value: string, userHash: string | null) => {
//   let hashedPin = await sha256HashPin(value);
//   return userHash === hashedPin;
// };

// export const encryptHash = async (value: string) => {
//   const algo = 'secret key 123';
//   let ciphertext = AES.encrypt(value, algo).toString();
//   return ciphertext;
// };

// export const decryptHash = async (value: string) => {
//   const algo = 'secret key 123';
//   let bytes = AES.decrypt(value, algo);
//   let originalText = bytes.toString(CryptoJS.enc.Utf8);
//   return originalText;
// };
