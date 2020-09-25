const BOARD_SIZE = 10;
const STARTING_POINT = {
  x: 0,
  y: 0,
};
const BOARD = [];

const run = () => {
  const isValidStartingPosition = isValidPosition(STARTING_POINT);
  if (!isValidStartingPosition) {
    console.log("Invalid starting position!");
    return;
  }

  for (let i = 0; i < BOARD_SIZE; i++) {
    BOARD.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      BOARD[i].push(0);
    }
  }

  let currentPositionX = STARTING_POINT.x;
  let currentPositionY = STARTING_POINT.y;

  //need loop here
  const nextPossibleMovements = getPossibleMovements(
    currentPositionX,
    currentPositionY
  );
  const validMovements = getValidMovements(nextPossibleMovements);

  console.log("possible movements:");
  validMovements.forEach((move, index) => console.log(index + 1 + ":", move));
};

const getPossibleMovements = (currentPositionX, currentPositionY) => {
  const possibleMovements = [];

  //south east
  possibleMovements.push({
    x: currentPositionX + 2,
    y: currentPositionY + 1,
  });

  possibleMovements.push({
    x: currentPositionX + 1,
    y: currentPositionY + 2,
  });

  //north east
  possibleMovements.push({
    x: currentPositionX + 2,
    y: currentPositionY - 1,
  });

  possibleMovements.push({
    x: currentPositionX + 1,
    y: currentPositionY - 2,
  });

  //south west
  possibleMovements.push({
    x: currentPositionX - 2,
    y: currentPositionY + 1,
  });

  possibleMovements.push({
    x: currentPositionX - 1,
    y: currentPositionY + 2,
  });

  //north west
  possibleMovements.push({
    x: currentPositionX - 2,
    y: currentPositionY - 1,
  });

  possibleMovements.push({
    x: currentPositionX - 1,
    y: currentPositionY - 2,
  });

  return possibleMovements;
};

const getValidMovements = (possibleMovements) => {
  const validMovements = [];

  for (let i = 0; i < possibleMovements.length; i++) {
    const move = possibleMovements[i];
    if (isValidPosition(move)) {
      validMovements.push(move);
    }
  }

  return validMovements;
};

const isValidPosition = (point) => {
  const maxCoordinatePoint = BOARD_SIZE - 1;

  if (
    point.x > maxCoordinatePoint ||
    point.x < 0 ||
    point.y > maxCoordinatePoint ||
    point.y < 0
  ) {
    return false;
  }

  return true;
};

run();
