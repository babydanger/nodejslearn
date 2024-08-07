import express from 'express';

import { register, login, refreshToken } from '../controller/auth_controller.js';

/**
 * @param {express.Router} router 
 */
export default (router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/refreshToken', refreshToken);
}
 