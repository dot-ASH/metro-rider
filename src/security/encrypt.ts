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

