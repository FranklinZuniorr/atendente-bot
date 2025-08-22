import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { SERVICE_TOKEN_SECRET } from '../constants';

export const createToken = <TData extends object>(data: TData): string => {
  return sign(data, SERVICE_TOKEN_SECRET);
};


export const decodeToken = <TData extends object>(token: string): TData | null => {
  try {
    const decoded = verify(token, SERVICE_TOKEN_SECRET);
      
    if (typeof decoded === 'string') {
      return null;
    }
  
    return decoded as TData & JwtPayload;
  } catch {
    return null;
  }
};