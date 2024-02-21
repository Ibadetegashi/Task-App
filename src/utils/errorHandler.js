const handleValidationError = (res, error) => {
   return res.status(400).json({
        error: "Validation Error",
        details: error.errors
    });
};

const handleServerError = (res, error) => {
   return res.status(500).json({
        error: "Internal Server Error",
        details: error
    });
};

module.exports = {
    handleValidationError,
    handleServerError
};
