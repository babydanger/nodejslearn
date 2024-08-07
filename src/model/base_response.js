
class BaseResponse {
    message = "";
    data = null;
    status = false;

    constructor(message = "", data = null, status = true) {
        this.message = message;
        this.data = data;
        this.status = status;
    }
}

export default BaseResponse