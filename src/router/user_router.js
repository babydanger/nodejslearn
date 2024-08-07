import express from 'express';

import { getAllUser, updateUser, deleteUser } from '../controller/user_controller.js';
import { isAuthentication } from '../middleware/index.js';

/**
 * @param {express.Router} router 
 */
export default (router) => {
    router.get('/users', isAuthentication, getAllUser);
    router.put('/user', isAuthentication, updateUser);
    router.delete('/user', deleteUser);
}
