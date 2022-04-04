import express from 'express';
import db from '../sequelize';
import bcrypt from 'bcryptjs';
import { bodyNotEmpty } from '../middleware/requests';

import { generateAccessToken } from '../helpers/token-helpers.js';

// Initialize router
const router = express.Router();

// Registration route (/user/register)
router.post('/register', bodyNotEmpty, async (req, res) => {
    // console.log(req.body); // error logging
    try {

        const { email, password, confirmPassword,
            userType, securityQuestionId, securityQuestionAnswer,
            firstName, lastName, companyName } = req.body;

        //Check user database to see if user exists already
        const user = await db.User.findOne({ where: { email: req.body.email } });

        // Data validation
        if (user) {
            return res.status(401).send({ error: "Account already exists" });
        }
        if (password !== confirmPassword) {
            return res.status(401).send({ error: "Passwords are not equal" });
        }

        // Hashing of the password to store in database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({
            email: email.toLowerCase(),
            password: hashedPassword,
            user_type: userType,
            security_question_id: securityQuestionId,
            security_answer: securityQuestionAnswer,
            first_name: firstName,
            last_name: lastName,
            company_name: companyName
        });

        return res.status(201).json(newUser);

    } catch (err) {
        return res.status(500).send({ error: "Server error: database responded with error" });
    }
})

// Registration route (/user/login)
router.post('/login', bodyNotEmpty, async (req, res) => {
    console.log("Login request: " + JSON.stringify(req.body)) // error logging
    try {
        const { type, email, password } = req.body;

        //Validate user input at some point

        //Check if email exists
        var user;
        if (type === "seeker") {
            user = await db.Seeker.findOne({ where: { email: email } });
        }
        if (type === "employer") {
            user = await db.Employer.findOne({ where: { email: email } });
        }

        if (!user) {
            console.log("Login refused")
            return res.status(401).send({ error: "Account does not exist" });
        }

        const verified = bcrypt.compareSync(password, user.password);

        if (verified) {
            const token = generateAccessToken(user.id, user.email);
            const data = {
                id: user.id,
                email: user.email,
                userType: type,
                name: user.first_name + " " + user.last_name,
                token: token
            };

            user.last_connected = Date.now();
            await user.save();

            console.log("Login approved")
            return res.json(data);

        } else {
            console.log("Login refused")
            return res.status(401).send({ error: "Incorrect password" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Server error: database responded with error" });
    }

})

export default router;