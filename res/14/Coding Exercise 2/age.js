function lifeInWeeks(age,maxAge) {
    
/************Don't change the code above************/    
    
    //Write your code here.
    
    // console.log("You're " + age + " years old currently.");
    
    // console.log("If you live until you're " + maxAge + ", you've got:");
    
    var yearsLeft = maxAge - age
    var monthsLeft = yearsLeft * 12;
    var weeksLeft = yearsLeft * 52;
    var daysLeft = yearsLeft * 365;
    
    console.log("You have " + daysLeft + " days, " + weeksLeft + ", and " + monthsLeft + " months left.");
    
/*************Don't change the code below**********/
}

lifeInWeeks(51,90);
lifeInWeeks(28,90);
lifeInWeeks(45,90);


