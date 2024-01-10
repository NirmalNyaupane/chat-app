import jwt from 'jsonwebtoken';
import EnvConfiguration from '../config/env.config';

const generateAccessToken = (userId: string) => {
    return jwt.sign({ sub: userId }, EnvConfiguration.ACCESS_TOKEN_SECRET ?? "", {
        expiresIn: EnvConfiguration.ACCESS_TOKEN_EXPIRY
    })
}
export { generateAccessToken }