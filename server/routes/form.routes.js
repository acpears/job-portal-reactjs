import express from 'express';
import db from '../sequelize';

// Initialize router
const router = express.Router();

// Form data routes (security question, plans, etc)
router.post('/register', async (req, res) => {
    let data = {}
    try {
        const securityQuestions = await db.Security_Question.findAll()
        const seekerPlans = await db.Seeker_Plan.findAll()
        const employerPlans = await db.Employer_Plan.findAll()

        data.securityQuestions = securityQuestions.map((el) => {
            return {
                id: el.id,
                question: el.question
            }
        })

        data.seekerPlans = seekerPlans.map((el) => {
            return {
                id: el.id,
                name: el.name
            }
        });
        data.employerPlans = employerPlans.map((el) => {
            return {
                id: el.id,
                name: el.name
            }
        })
        console.log(data);
        res.send(data);
    } catch (err) {
        res.status(500).send({ error: "Server error: database responded with error" });
    }

})

export default router;