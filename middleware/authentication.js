const jwt = require('jsonwebtoken');

function authenticate(...roles) {

    return (req, res, next) => {
        const authHeader = req.header("Authorization");

        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ error: "Failed to authenticate" })

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ message: "Forbidden" })
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden" })
            }

            req.user = user;
            next();

        })
    }
}

module.exports = { authenticate };