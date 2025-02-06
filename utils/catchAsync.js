// Required due to how Express handles errors from asynchronous functions
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}