import bcrypt from "bcrypt";
export const generateBcryptHash = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

export const compareBcryptHash = async (text: string, hash: string) => {
  const result = await bcrypt.compareSync(text, hash);
  return result;
};
