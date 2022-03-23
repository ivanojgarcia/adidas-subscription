import bcrypt from 'bcryptjs';

const createHash = async text => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, salt);
}

const comparePassword = async (inputPassword, password) => {
    return await bcrypt.compare(inputPassword, password);
}
export { createHash, comparePassword }