const Denque = require("denque");

const BOARD_SIZE = 3;
const MAX_BOARD_COORDINATE = BOARD_SIZE - 1;
const STARTING_POINT = {
  x: 0,
  y: 0,
};

const run = () => {
  if (!isValidPosition(STARTING_POINT)) {
    console.log("Invalid starting position!\n", []);
    return;
  }

  const result = getResult(STARTING_POINT);
  result.forEach((item, index) => {
    console.log(`Path #${index + 1}:`);

    item.forEach((position, index) =>
      console.log(`\t ${index + 1}:`, position)
    );
  });
};

const getResult = (position) => {
  let queue = new Denque([{ ...position, path: [] }]);
  const result = [];

  while (!queue.isEmpty()) {
    const currentPosition = queue.shift();
    const { x, y } = currentPosition;

    const nextPossibleMovements = getPossibleMovements(currentPosition);
    const nextValidMovements = nextPossibleMovements.filter((move) =>
      isValidPosition(move)
    );

    let isEndOfPath = true;
    nextValidMovements.forEach((move) => {
      //if the result is -1 => cell was not visited
      const indexOfNextMove = currentPosition.path.findIndex(
        (point) => point.x === move.x && point.y === move.y
      );

      //if cell was not visited
      if (indexOfNextMove < 0) {
        const path = [...currentPosition.path];
        isEndOfPath = false;
        path.push({ x, y });
        queue.push({ ...move, path });
      }
    });

    //end of path => add path to result
    if (isEndOfPath) {
      currentPosition.path.push({ x, y });
      result.push(currentPosition.path);
    }
  }
  return result;
};

const getPossibleMovements = (position) => {
  const { x, y } = position;
  const possibleMovements = [];

  //north west
  possibleMovements.push({
    x: x - 2,
    y: y - 1,
  });

  possibleMovements.push({
    x: x - 1,
    y: y - 2,
  });

  //north east
  possibleMovements.push({
    x: x + 2,
    y: y - 1,
  });

  possibleMovements.push({
    x: x + 1,
    y: y - 2,
  });

  //south west
  possibleMovements.push({
    x: x - 2,
    y: y + 1,
  });

  possibleMovements.push({
    x: x - 1,
    y: y + 2,
  });

  //south east
  possibleMovements.push({
    x: x + 2,
    y: y + 1,
  });

  possibleMovements.push({
    x: x + 1,
    y: y + 2,
  });

  return possibleMovements;
};

//check if position is within the board range
const isValidPosition = (point) => {
  if (
    point.x > MAX_BOARD_COORDINATE ||
    point.x < 0 ||
    point.y > MAX_BOARD_COORDINATE ||
    point.y < 0
  ) {
    return false;
  }

  return true;
};

run();
