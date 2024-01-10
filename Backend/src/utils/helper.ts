import bcrypt from "bcrypt";
import EnvConfiguration from "../config/env.config";

const otpGenerator = () => {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isHashValueCorrect = async (hash: string, plainText: string | number) => {
  console.log("plain", plainText)
  console.log("hash", hash);
  return await bcrypt.compare(plainText.toString(), hash);
};

export { otpGenerator, isHashValueCorrect };
