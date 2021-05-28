type Rating = 1 | 2 | 3;

interface TrainingResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: String,
    target: number,
    average: number
}

const calculateExercises = (hours: Array<number>): TrainingResult => {
    const trainingDays: Array<number> = hours.filter(n => n > 0)
    const avg: number = trainingDays.reduce((a, c) => a + c, 0) / hours.length
    return {
        periodLength: hours.length,
        trainingDays: trainingDays.length,
        success: false,
        rating: 1,
        ratingDescription: "needs work",
        target: 5,
        average: avg
    }
}

const [first, second, ...hoursString] = process.argv;
console.log(hoursString);

const hours: Array<number> = hoursString.map(a => {
    if (!isNaN(Number(a))) {
        return Number(a);
    } else {
        throw new Error('Provided values were not numbers!');
    }

});

console.log(calculateExercises(hours));