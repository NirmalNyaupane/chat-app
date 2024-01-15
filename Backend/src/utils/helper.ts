import bcrypt from "bcrypt";
import EnvConfiguration from "../config/env.config";

const otpGenerator = () => {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateHashValue = async (value:string)=>{
  return await bcrypt.hash(value, 10)
}

const isHashValueCorrect = async (hash: string, plainText: string | number) => {
  return await bcrypt.compare(plainText.toString(), hash);
};

export { otpGenerator, isHashValueCorrect, generateHashValue };
