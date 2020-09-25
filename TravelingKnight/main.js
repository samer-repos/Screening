const BOARD_SIZE = 3;
const STARTING_POINT = {
  x: 0,
  y: 0,
};
const BOARD = [];
const POSSIBLE_MOVEMENTS = [];

const run = () => {
  const isValidStartingPosition = isValidPosition(STARTING_POINT);
  if (!isValidStartingPosition) {
    console.log("Invalid starting position!\n", []);
    return;
  }

  //fill the board with 0s => 0 means cell is not visited
  for (let i = 0; i < BOARD_SIZE; i++) {
    BOARD.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      BOARD[i].push(0);
    }
  }

  let currentPositionX = STARTING_POINT.x;
  let currentPositionY = STARTING_POINT.y;

  getResult(currentPositionX, currentPositionY);
  POSSIBLE_MOVEMENTS.forEach((item, index) => {
    console.log(`Path #${index + 1}:`);
    item.forEach((position) => console.log("\t", position));
  });
};

//recursion to calculate the result
const getResult = (currentPositionX, currentPositionY, movements = []) => {
  const nextPossibleMovements = getPossibleMovements(
    currentPositionX,
    currentPositionY
  );
  const validMovements = getValidMovements(nextPossibleMovements);
  debugger;

  //mark current cell as visited
  BOARD[currentPositionX][currentPositionY] = 1;

  //add current cell to current movements
  const movementsCloned = [...movements];
  movementsCloned.push({ x: currentPositionX, y: currentPositionY });

  validMovements.forEach((move) => {
    const { x, y } = move;

    getResult(x, y, movementsCloned);
  });

  //when there's no more moves => this is the full path
  if (validMovements.length <= 0) {
    POSSIBLE_MOVEMENTS.push(movementsCloned);
  }
  BOARD[currentPositionX][currentPositionY] = 0;
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

    //if in range and the cell is not visited
    if (isValidPosition(move) && !BOARD[move.x][move.y]) {
      validMovements.push(move);
    }
  }

  return validMovements;
};

//check if position is within the board range
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
