const jwt = require("jsonwebtoken")

function authMiddleware(request, response, next) {
    const headerToken = request.headers.authorization;

    if (headerToken == undefined) {
        next()
    }
    if (headerToken !== undefined) {
        const token = request.headers.authorization.split(' ')[1]
        if (!token) {
            return response.send({ message: "No token provided" }).status(401);
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY).user
        if (!decoded) {
            return response.send({ message: "Could not authorize" }).status(403);
        }
        // next(decoded.user)
        next()
    }



}

module.exports = authMiddleware;
