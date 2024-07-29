// types/express.d.ts
import {IUser} from "../src/interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add 'user' property to Request
    }
  }
}
