import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const expireAccessTokenTime = '1h';
const expireRefreshTokenTime = '7d';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const generateToken = (payload) => {
    const token = jwt.sign(payload, accessTokenSecret, { algorithm: 'HS256', expiresIn: expireAccessTokenTime });
    return token;
}

export const generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, refreshTokenSecret, { algorithm: 'HS256', expiresIn: expireRefreshTokenTime });
    return token;
}

export const verifyToken = (token) => {
    const payload = jwt.verify(token, accessTokenSecret, { algorithms: 'HS256' });
    return payload;
}

export const verifyRefreshToken = (token) => {
    const payload = jwt.verify(token, refreshTokenSecret, { algorithms: 'HS256' });
    return payload;
}