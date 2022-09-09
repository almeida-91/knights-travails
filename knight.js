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
        position = [i, j];
        currentMove = new move([i, j]);
        this.array.push(currentMove);
      }
    }
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
    this.nextMove = null;
    this.getPossibleMoves(board);
    board.array[(start[0], start[1])].isVisited = true;
  }

  newMove(array) {
    if (array[0] < 0 || array[1] < 0) return;
    if (array[0] > 7 || array[1] > 7) return;
    return array;
  }

  getPossibleMoves(board) {
    let start = this.root;
    this.possibleMoves.push(this.newMove([start[0] + 1, start[1] + 2]));
    this.possibleMoves.push(this.newMove([start[0] + 1, start[1] - 2]));
    this.possibleMoves.push(this.newMove([start[0] - 1, start[1] + 2]));
    this.possibleMoves.push(this.newMove([start[0] - 1, start[1] - 2]));
    this.possibleMoves.push(this.newMove([start[0] + 2, start[1] + 1]));
    this.possibleMoves.push(this.newMove([start[0] + 2, start[1] - 1]));
    this.possibleMoves.push(this.newMove([start[0] - 2, start[1] + 1]));
    this.possibleMoves.push(this.newMove([start[0] - 2, start[1] - 1]));
    this.filterIlegalMoves(board);
  }

  checkGoal(goal) {
    let moveList = this.possibleMoves;
    let goalRoot = goal.root;
    let goalReached = false;
    let index = 0;
    while (goalReached == false && index < moveList.length) {
      goalReached = moveList[index].every((r) => goalRoot.includes(r));
      index++;
    }
    if (goalReached == false) return false;
    return goalReached;
  }

  getNewKnights(board) {
    let moveList = this.possibleMoves;
    for (let i = 0; i < moveList.length; i++) {
      moveList[i] = new knight(moveList[i], board);
    }
  }

  filterIlegalMoves(board) {
    this.possibleMoves = this.possibleMoves.filter((item) => {
      return item != undefined;
    });
  }

  findWay(goal) {
    let goalRoot = goal;
    let start = this.root;
  }
}

function knightMoves(start, goal, gameBoard) {
  if (start[0] > 8 || start[1] > 8) return "ilegal";
  let knightStart = new knight(start, gameBoard);
  /* if (knightStart.checkGoal(knightGoal) == false){
        let nextMoves = knightStart.possibleMoves;
        console.log(nextMoves);
        for (let i = 0 ; i < nextMoves.length ; i++){
            let move = new knight(nextMoves[i]);
            console.log(move);
            if (move.checkGoal(knightGoal) == true) return 'success';
        } */

  //}
  /* console.log(knightStart.checkGoal(knightGoal));
    return `[${knightStart.root}] [${knightGoal.root}]`; */
}

let start = [0, 0];
let goal = [1, 2];
let b = new board();

knightMoves(start, goal, b);
