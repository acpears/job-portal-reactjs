export const bodyNotEmpty = (req, res, next) => {
    //Validate req.body
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "req.body is empty" });
    }
    next();
};