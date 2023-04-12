class ApiResponse {
    constructor(code, status, message, data) {
        this.message = message
        this.code = code;
        this.status = status;
        this.data = data;
    }
}

module.exports = ApiResponse;
