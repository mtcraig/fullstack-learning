/**
 * Welcome to the Stanford Karel IDE.
 * This is a free space for you to 
 * write any Karel program you want.
 **/
function main() {
   while (noBeepersPresent()) {
      while (frontIsClear()) {
         move();
         if (rightIsClear()) {
            putBeeper();
            turnRight();
         }
      }
      while (frontIsBlocked()) {
         turnLeft();
      }
   }
}