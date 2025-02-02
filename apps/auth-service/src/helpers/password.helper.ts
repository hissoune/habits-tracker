
import * as bcrypt from 'bcrypt';


export async function  hashPassword (password:string){
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function comparPassword(UserPassword:string,password:string){
    const istrue = await bcrypt.compare(UserPassword,password);
    return istrue
}