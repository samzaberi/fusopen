type Rating = 1 | 2 | 3;

export interface TrainingResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (hours: Array<number>, target: number): TrainingResult => {
    const trainingDays: Array<number> = hours.filter(n => n > 0);
    const avg: number = trainingDays.reduce((a, c) => a + c, 0) / hours.length;
    return {
        periodLength: hours.length,
        trainingDays: trainingDays.length,
        success: trainingDays.length < hours.length ? false : true,
        rating: 1,
        ratingDescription: "so so",
        target: target,
        average: avg
    };
};

// const hoursString = process.argv.slice(2);
// console.log(hoursString);

// const hours: Array<number> = hoursString.map(a => {
//     if (!isNaN(Number(a))) {
//         return Number(a);
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }

// });

// console.log(calculateExercises(hours));