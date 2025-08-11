function HouseKeepers (name,yearsOfExperience,cleaningRepertoire) {
    this.name = name;
    this.yearsOfExperience = yearsOfExperience;
    this.cleaningRepertoire = cleaningRepertoire;
    this.clean = function () {
        alert("Cleaning in progress");
    }
}

var houseKeeper1 = new HouseKeepers(12,"Jane",["bathroom", "lobby", "bedroom"])
var houseKeeper2 = new HouseKeepers(5,"Kylie",["kitchen", "dining room"])

houseKeeper1.clean()