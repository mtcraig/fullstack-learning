function bottles() {
    var count = 99;
    while (count > 0) {
        console.log(count + " bottles of beer on the wall, 99 bottles of beer. Take 1 down, pass it around, " + (count-1) + " bottles of beer on the wall.");
        count--;
    }
    console.log("No more bottles of beer on the wall, no more bottles of beer. Go to the store and buy some more, 99 bottles of beer on the wall.");
}
bottles();