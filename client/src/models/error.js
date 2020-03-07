class ErrorHandler extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

export const handleError = (err, res) => {
    const { message = "Something wrong" } = err;

    // When testing, only show unhandled error
    if (process.env.NODE_ENV !== "test" || message === "Something wrong") {
        console.error(err);
    }
};

export default ErrorHandler;