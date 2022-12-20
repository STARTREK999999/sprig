/*
@title: Deliver
@author: Jack 

Instructions:

The objective is to push the parcles onto the trucks.
Press j to reset the current level.

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ box, bitmap`
................
................
................
................
C..............C
.C............C.
..C..........C..
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...`],
  [ goal, bitmap`
2222222222222222
2222222222222222
2222225252222222
2222555552522222
2255552255525525
2222222222555555
2222222222222552
2222222222222222
2222222222222222
2222222222222222
2222222222222222
0000000000000000
...00...........
..01L0..........
..0L10..........
...00...........`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

let level = 0;
const levels = [
  map`
........w
..b.....w
p.......g
........w
........w
..b.....g
........w
.b......w
........g`,
  map`
p........g
...b.....g
.b...b.b.g
.........g
...b.....g
.b.......g
...b.b...g
b.....b..g
.......b.g
.b.......g`,
  map`
p..g
.b..
....
....`,
  map`
.......g
.b.....w
....b..w
.......g
p.b....w
.......w
.......g
b...b..w`,
  map`
.......w
.......w
..b....w
.......w
.......g
.......w
.p.....w
.......w`,
  map`
........g
........w
...b....g
........w
........w
........g
........w
........w`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});
// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
