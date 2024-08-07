import mongoose from "mongoose";

const FileSchema = mongoose.Schema({
    fileName: {type: String, require: true},
    path: {type: String, require: true},
    mimeType: {type: String, require:true}
    
})

export const FileModel = mongoose.model('File', FileSchema);