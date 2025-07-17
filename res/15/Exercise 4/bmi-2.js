function bmiCalculator (weight, height) {
    
    var bmi = weight / Math.pow(height,2);
    
    if (bmi < 18.5) {
        var interpretation = "Your BMI is " + bmi + ", so you are underweight."
    } else if (bmi < 24.9) {
        var interpretation = "Your BMI is " + bmi + ", so you have a normal weight."
    } else {
        var interpretation = "Your BMI is " + bmi + ", so you are overweight."
    }
    return interpretation;
}