import { getUserById } from "../database/db_users.js";
import express from 'express';
import { verifyToken } from '../utils/jwt.js';
import ErrorResponse from "../model/error_response.js";

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const isAuthentication = async (req, res, next) => {
    try {
        let [scheme, token] = req.headers.authorization.split(' ');
        if (scheme == 'Bearer') {
            const payload = verifyToken(token);

            const user = await getUserById(payload.id);
            if (!user) {
                return res.sendStatus(401);
            }

            req.userPayload = user;
            return next()
        } else {
            return res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
}
