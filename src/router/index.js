import express from 'express';
import auth from './auth_router.js';
import user from './user_router.js';
import upload from './upload_router.js'

const router = express.Router();

export default () => {
    auth(router);
    user(router);
    upload(router);
    return router;
}