import express from 'express';
import ErrorResponse from '../model/error_response.js';
import { FileModel } from '../database/db_file.js';
import SuccessResponse from '../model/success_response.js';

export const uploadAvatar = async(req, res) => {
    try {
        const {file} = req;

        if(!file){
            return res.status(403).send(new ErrorResponse('No file uploaded'))
        }

        const newFile = new FileModel({
            fileName: file.filename,
            path: file.path,
            mimetype: file.mimetype
        });

        await newFile.save();
        return res.status(200).send(new SuccessResponse(newFile, 'Upload success'));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}