
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { getUsers, deleteUserById, updateUserById, getUserById } from '../database/db_users.js';
import { myCache } from '../index.js';
import lodash from 'lodash';
import Mongoose from 'mongoose';

export const getAllUser = async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).send(new SuccessResponse(users)).end();
    } catch (e) {
        console.log(e);
        return res.status(400).send(new ErrorResponse(error));
    }
}

export const deleteUser = async (req, res) => {
    try {

    } catch (e) {
        console.log(e);
        return res.status(400).send(new ErrorResponse(error));
    }
}

export const updateUser = async (req, res) => {
    try {
        const { username } = req.body;
        const userId = req.query.id

        const cachePermission = await myCache.get('Pers');
        const user = req.userPayload;
        const updatePer = lodash.find(cachePermission, { mode: 'update' });
        const isHaveUpdatePer = lodash.find(user.permissions, { _id: new Mongoose.Types.ObjectId(updatePer.id) });
        if (!isHaveUpdatePer) {
            return res.sendStatus(401);
        }

        await updateUserById(userId, { username })
        return res.status(200).send(new SuccessResponse(null, 'Update success')).end();
    } catch (e) {
        console.log(e);
        return res.status(400).send(new ErrorResponse(e));
    }
}