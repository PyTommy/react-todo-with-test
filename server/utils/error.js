class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode = 500, message = "Server Error" } = err;

    // When testing, only show unhandled error
    if (process.env.NODE_ENV !== "test" || statusCode === 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

module.exports = {
    ErrorHandler,
    handleError
}