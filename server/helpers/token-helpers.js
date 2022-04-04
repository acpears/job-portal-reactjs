import jwt from 'jsonwebtoken';

// Middleware

// Middleware to authenticate JWT token
export function authenticateToken(req, res, next) {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log("Cleint with ip " + ip + " is verifying token...")
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                console.log('Unauthorized token');
                res.status(401).send({ error: "unauthorized token" })
            } else {
                console.log('Authorized token');
                req.body = { id: data.id, user: data.email };
                next();
            }
        })
    } else {
        console.log('No token');
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

// General functions

// Create new JWT token to send to client
export const generateAccessToken = (id, email) => {
    return jwt.sign({ id: id, email: email }, process.env.TOKEN_SECRET, { expiresIn: '10m' });
}
