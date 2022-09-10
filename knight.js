class board {
  constructor() {
    this.size = 8;
    this.array = [];
    this.newBoard();
  }

  newBoard() {
    let currentMove;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        currentMove = new move([i, j]);
        this.array.push(currentMove);
      }
    }
  }

  isFull() {
    let checkfull = this.array.filter((obj) => {
      return obj.isVisited == false;
    });
    return checkfull.length == 0 ? true : false;
  }
}

class move {
  constructor(position) {
    this.position = position;
    this.isVisited = false;
  }
}

class knight {
  constructor(start, board) {
    this.root = start;
    this.possibleMoves = [];
    this.nextMoves = [];
    this.previousMove = null;
    this.getPossibleMoves();
    board.array[start[0] * 8 + start[1]].isVisited = true;
  }

  newMove(array) {
    if (array[0] < 0 || array[1] < 0) return;
    if (array[0] > 7 || array[1] > 7) return;
    return array;
  }

  getPossibleMoves() {
    let start = this.root;
    this.possibleMoves.push(this.newMove([start[0] + 1, start[1] + 2]));
    this.possibleMoves.push(this.newMove([start[0] + 1, start[1] - 2]));
    this.possibleMoves.push(this.newMove([start[0] - 1, start[1] + 2]));
    this.possibleMoves.push(this.newMove([start[0] - 1, start[1] - 2]));
    this.possibleMoves.push(this.newMove([start[0] + 2, start[1] + 1]));
    this.possibleMoves.push(this.newMove([start[0] + 2, start[1] - 1]));
    this.possibleMoves.push(this.newMove([start[0] - 2, start[1] + 1]));
    this.possibleMoves.push(this.newMove([start[0] - 2, start[1] - 1]));
    this.filterIlegalMoves();
  }

  checkGoal(goal) {
    let knightX = this.root[0];
    let knightY = this.root[1];
    let goalX = goal[0];
    let goalY = goal[1];
    return knightX == goalX && knightY == goalY;
  }

  getNewKnights(board) {
    if (board.isFull() == true) return null;
    let previousKnight = new knight(this.root, board);
    this.nextMoves = previousKnight.nextMoves;
    let queue = previousKnight.possibleMoves;
    let currentKnight;
    while (queue.length > 0 && board.isFull() == false) {
      let currentMoves = queue.shift();
      let boardX = currentMoves[0];
      let boardY = currentMoves[1];
      if (board.array[boardX * 8 + boardY].isVisited == false) {
        currentKnight = new knight(currentMoves, board);
        currentKnight.previousMove = previousKnight.root;
        previousKnight.nextMoves.push(currentKnight);
      }
    }
  }

  fillBoard(board) {
    if (board.isFull() == true) return null;
    let queue = [];
    queue.push(this.nextMoves);
    while (queue.length > 0 && board.isFull() == false) {
      let nextMoveArray = queue.shift();
      for (let i = 0; i < nextMoveArray.length; i++) {
        let currentKnight = nextMoveArray[i];
        currentKnight.getNewKnights(board);
        queue.push(currentKnight.nextMoves);
      }
    }
  }

  filterIlegalMoves() {
    this.possibleMoves = this.possibleMoves.filter((item) => {
      return item != undefined;
    });
  }
}

function knightMoves(start, goal) {
  if (start[0] > 8 || start[1] > 8) return "ilegal";
  if (start[0] == goal[0] && start[1] == goal[1])
    return "Knight is already in goal";
  let gameBoard = new board();
  let knightStart = new knight(start, gameBoard);
  knightStart.getNewKnights(gameBoard);
  knightStart.fillBoard(gameBoard);
  let knightGoal = findPath(goal, knightStart);
  let moves = getNumberOfMoves(knightGoal, knightStart);
  console.log(`You made it in ${moves} moves!  Here's your path:`);
  getMinPath(knightGoal, knightStart);
}

let start = [0, 0];
let goal = [3, 3];
let b = new board();

knightMoves(start, goal);

function findPath(goal, knight) {
  let queue = [];
  queue.push(knight.nextMoves);
  let moves = 0;
  while (queue.length != 0) {
    let currentKnightArray = queue.shift();
    for (i = 0; i < currentKnightArray.length; i++) {
      let currentKnight = currentKnightArray[i];
      if (
        currentKnight.root[0] == goal[0] &&
        currentKnight.root[1] == goal[1]
      ) {
        return currentKnight;
      }
      if (currentKnight.nextMoves.length > 0) {
        queue.push(currentKnight.nextMoves);
      }
    }
    moves++;
  }
  return;
}

function getNumberOfMoves(Goalknight, originalKnight) {
  let moves = 0;
  while (Goalknight != undefined) {
    tmp = Goalknight.previousMove;
    Goalknight = findPath(tmp, originalKnight);
    moves++;
  }
  return moves;
}

function getMinPath(Goalknight, originalKnight) {
  let pathArray = [];
  pathArray.push(Goalknight.root);
  while (Goalknight != undefined) {
    tmp = Goalknight.previousMove;
    Goalknight = findPath(tmp, originalKnight);
    pathArray.push(tmp);
  }
  const result = pathArray.reverse();
  result.forEach((item) => console.log(item));
}
