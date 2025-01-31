import jwt from 'jsonwebtoken'; 
import { IUser } from '../interfaces/user.interface';

let secret = process.env.JWT_SECRET as string || 'hsdfkshdfkk'

export const generateToken = async(user:IUser): Promise<string>=>{
    const token = jwt.sign(
        { user},
        secret,
        { expiresIn: '15d' }
      );
    return token
}
