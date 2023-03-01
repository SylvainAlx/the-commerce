import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const secret = "key_secret";
    const decoded = jwt.verify(token, secret);
    if (decoded) {
        res.locals.decoded = decoded;
        next();
    } else {
        res.send("pas de JWT valide");
    }
};

export const isAdmin = (req, res, next) => {
    if (res.locals.decoded.isAdmin) {
        next();
    } else {
        res.send("vous n'avez pas les droits d'administration");
    }
};
