import mongoose from "mongoose";

const PermissionSchema = mongoose.Schema({
    mode: { type: String, require: true },
})

export const PermissionModel = mongoose.model('Permission', PermissionSchema);

export const getPermissions = () => PermissionModel.find()

export const checkPermission = (mode) => PermissionModel.find({ mode })

// export const queryNormalPermission = async () => {
//     const permissions = await PermissionModel.find({ $or: [{ mode: 'detail' }, { mode: 'update' }] }, 'id')
//     return permissions.map(per => ({id: per.id}));
// }
export const queryNormalPermission = () => PermissionModel.find({ $or: [{ mode: 'detail' }, { mode: 'update' }] }, 'id');
    // const permissions = await PermissionModel.find({ $or: [{ mode: 'detail' }, { mode: 'update' }] }, 'id')
    // return permissions.map(per => ({id: per.id}));
// }
