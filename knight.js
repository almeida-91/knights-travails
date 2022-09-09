class board {
  constructor() {
    this.size = 8;
    this.array = [];
    this.newBoard();
  }

  newBoard() {
    let position = [];
    let currentMove;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        position = [j, i];
        currentMove = new move([i, j]);
        this.array.push(currentMove);
      }
    }
  }

  isFull(){
    let checkfull = this.array.filter(obj => { 
        return obj.isVisited == false;
    })
    return checkfull.length==0 ? true : false;
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
    this.getPossibleMoves(board);
    board.array[(start[0]*8+start[1])].isVisited = true;
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
    return (knightX == goalX && knightY == goalY);
  }

  getNewKnights(board,goal) {
    if (board.isFull()==true) return null;
    let previousKnight = new knight(this.root,board);
    let queue = previousKnight.possibleMoves;
    let currentKnight;    
    while (board.isFull()==false){
        let currentMoves = queue.shift();
        let boardX = currentMoves[0];
        let boardY = currentMoves[1];
        if (board.array[(boardX*8+boardY)].isVisited == false){
            currentKnight = new knight(currentMoves,board);
            currentKnight.nextMoves.push(previousKnight);
            if (currentKnight.checkGoal(goal)== true) return currentKnight;
            previousKnight = currentKnight;
            currentKnight.possibleMoves.forEach(item => queue.push(item));
        }
    }
    return currentKnight;
  }

  filterIlegalMoves() {
    this.possibleMoves = this.possibleMoves.filter((item) => {
      return item != undefined;
    });
  }
}

function knightMoves(start, goal, gameBoard) {
  if (start[0] > 8 || start[1] > 8) return "ilegal";
  if (start[0] == goal[0] && start[1] == goal[1]) return "Knight is already in goal";
  let knightStart = new knight(start, gameBoard);
  let goalX = goal[0];
  let goalY = goal[1];
  //knightStart.getNewKnights(gameBoard);
/*   while (gameBoard.array[ goalX , goalY ].isVisited == false){
    knightStart = knightStart.possibleMoves;
    for (let i = 0 ; i < knightStart.length ; i++){
        knightStart[i].getNewKnights(gameBoard);
    }
  } */
  console.log('END');
  return `[${knightStart.root}] [${goal}]`;
}

let start = [0, 0];
let goal = [3, 3];
let b = new board();

knightMoves(start, goal, b);
