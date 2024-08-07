import express from 'express';
import { upload } from '../index.js';
import { uploadAvatar } from '../controller/upload_controller.js';
import { isAuthentication } from '../middleware/index.js';

/**
 * @param {express.Router} router 
 */
export default (router) => {
    router.post('/uploadAvatar', isAuthentication, upload.single('file'), uploadAvatar);
}
