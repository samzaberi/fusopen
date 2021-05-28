/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface bmiResponse {
    height: number,
    weight: number,
    bmi: string
}

const isNumArr = (arr: Array<number>): boolean => {
    return arr.every(a => !isNaN(a));
};

app.get('/', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        const bmi = calculateBmi(height, weight);
        const response: bmiResponse = {
            height,
            weight,
            bmi
        };
        res.send(response);
    } else {
        res.status(400).send({ error: "malformatted parameters" });
    }
});

app.post('/exercises', (req, res) => {
    const body = req.body;
    console.log(body);

    if (!('daily_exercises' in body) && !('target' in body)) {
        res.status(400).send({
            error: "parameters missing"
        });
    }

    if (isNumArr(body.daily_exercises) && !isNaN(body.target)) {
        const result = calculateExercises(body.daily_exercises, body.target);
        res.send(result);
    } else {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});