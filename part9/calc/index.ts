import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

interface bmiResponse {
    height: number,
    weight: number,
    bmi: string
}

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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});