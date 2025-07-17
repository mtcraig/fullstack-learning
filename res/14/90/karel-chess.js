/**
 * Welcome to the Stanford Karel IDE.
 * This is a free space for you to 
 * write any Karel program you want.
 **/
 
function main() {
   while (leftIsClear() || frontIsClear()){
      odd();
         move(); /* Odd world sizes only */
      even();
   }
}

function odd() {
   putBeeper();
   if (frontIsClear()) {
      while (frontIsClear()) {
         move();
         if (frontIsClear()) {
            move();
            putBeeper();
         }
      }
      turnLeft();
      move();
      turnLeft();
   }
}

function even() {
   putBeeper();
   if (frontIsClear()) {
      while (frontIsClear()) {
         move();
         if (frontIsClear()) {
            move();
            putBeeper();
         }
      }
      turnRight();
      move();
      turnRight();
   }
}

