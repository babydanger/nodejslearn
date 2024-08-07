import { createUser, getUserByEmail } from '../database/db_users.js';
import { queryNormalPermission } from '../database/db_permission.js';
import md5 from 'crypto-js/md5.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { generateRefreshToken, generateToken, verifyRefreshToken } from '../utils/jwt.js';
import express from 'express';

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const register = async (req, res) => {
    try {
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            return res.status(400).send(new ErrorResponse('missing required field'));
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).send(new ErrorResponse('existing user'));
        }

        const permissions = await queryNormalPermission();
    
        const user = await createUser({
            username,
            email,
            password: md5(password),
            permissions
        });

        if (!user) {
            return res.status(400).send(new ErrorResponse('can not create user'));
        }

        return res.status(200).send(new SuccessResponse(null, 'User Created')).end();

    } catch (error) {
        console.log(error);
        return res.status(400).send(new ErrorResponse(error));
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send(new ErrorResponse('Missing required field'));
        }

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return res.status(400).send(new ErrorResponse('User not found'));
        }

        if (md5(password) != existingUser.password) {
            return res.status(400).send(new ErrorResponse('Wrong password'));
        }

        const payload = {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email
        }

        const token = generateToken(payload);
        const refreshToken = generateRefreshToken(payload);

        const user = {
            id: existingUser.id,
            accessToken: token,
            refreshToken,
            username: existingUser.username,
            email: existingUser.email
        }

        return res.status(200).send(new SuccessResponse(user)).end();

    } catch (error) {
        console.log(error);
        return res.status(400).send(new ErrorResponse(error));
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.sendStatus(401);
        }
        const payload = verifyRefreshToken(refreshToken);
        const newToken = generateToken(payload);
        const newRefreshToken = generateRefreshToken(payload);
        const response = {
            accessToken: newToken,
            refreshToken: newRefreshToken
        }
        return res.status(200).send(new SuccessResponse(response, "Success"))
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }

}