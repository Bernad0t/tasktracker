import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)
    return hashedPassword;
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    console.log(hashedPassword)
    return await bcrypt.compare(password, hashedPassword);
}