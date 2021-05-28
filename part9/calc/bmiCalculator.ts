export const calculateBmi = (height: number, weight: number): string => {
    const result: number = Math.floor(weight / Math.pow((height / 100), 2));
    if (result >= 18 && result <= 25) {
        return "Normal (healthy weight)";
    } else {
        return "BMI not in normal range";
    }
};

// interface heightWeight {
//     height: number;
//     weight: number;
// }

// const parseArguments = (args: Array<string>): heightWeight => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

// const { height, weight } = parseArguments(process.argv);
// const result = calculateBmi(height, weight);
// console.log(result);
