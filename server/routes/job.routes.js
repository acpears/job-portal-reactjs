import express from 'express';
import db from '../sequelize';
import { bodyNotEmpty } from '../middleware/requests';
import { Op } from 'sequelize';
import { postingsFiltering } from '../helpers/filter-search.helpers';


// Initialize router
const router = express.Router();

router.post('/postings', async (req, res) => {
    try {
        const jobs = await db.Job.findAll(postingsFiltering(req.body));
        res.json(jobs);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server error: database responded with error" });
    }
});

router.post('/applications', bodyNotEmpty, async (req, res) => {
    try {
        const id = req.body.id
        const filters = req.body.filters;
        console.log('Request applications')
        const jobs = await db.Job.findAll()
        res.json(jobs);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server error: database responded with error" });
    }

});





export default router;