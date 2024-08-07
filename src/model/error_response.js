
import BaseResponse from './base_response.js';

class ErrorResponse extends BaseResponse {
    constructor(message) {
        super();
        this.message = message;
        this.status = false;
        this.data = null;
    }
}

export default ErrorResponse;