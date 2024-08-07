import BaseResponse from './base_response.js';

class SuccessResponse extends BaseResponse {
    constructor(data = null, message = 'Thành công') {
        super();
        this.message = message;
        this.status = true;
        this.data = data;
    }
}

export default SuccessResponse;