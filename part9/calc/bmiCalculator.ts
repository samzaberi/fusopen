const calculateBmi = (height: number, weight: number): String => {
    const result: number = Math.floor(weight / Math.pow((height / 100), 2));
    if (result >= 18 && result <= 25) {
        return "Normal (healthy weight)"
    } else {
        return "BMI not in normal range"
    }
}

console.log(calculateBmi(180, 74));
