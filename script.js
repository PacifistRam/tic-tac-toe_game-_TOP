const Gameboard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];

    const getBoard = () => {
        console.table(board);
        return board;
    }

    const placeMark = (index, mark) => {
        if (board[index] === null) {
            board[index] = mark;
            return true;
        } else {
            return false;
        }
    };

    return {
        getBoard,
        placeMark,
    };
})();

const Player = (name, symbol) => {
    return {
        name,
        symbol,
    };
};

const GameController = (() => {
    let currentPlayer;
    let gameboard;
    let player1;
    let player2;
    let winnerFound = false;

    const WINNING_COMBINATIONS = [
        [0,1,2], //row 1
        [3,4,5], //row 2
        [6,7,8], //row 3
        [0,3,6], // col 1
        [1,4,7], //col 2
        [2,5,8], //col 3
        [0,4,8], //diagonal 1
        [2,4,6] //diagonal 2
    ];

    const startGame = () => {
        // initialize the gameboard and players
        gameboard = Gameboard;
        player1 = Player('Player 1', 'X');
        player2 = Player('Player 2', 'O');

        // set the current player
        currentPlayer = player1;
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        const currentBoard = gameboard.getBoard();

        for (const combination of WINNING_COMBINATIONS){
            const[a,b,c] = combination; // destructure combination row into three variables
            if (
                currentBoard[a] && 
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                console.log(`${currentPlayer.name} wins`);
                return true;
            }
        }

        //check for draw

        if(currentBoard.every(cell => cell != null)){
            console.log("its a draw");
            return true;
        }
        return false;
    };



    const makeMove = (index) => {
        const currentBoard = gameboard.getBoard();
        if (!winnerFound && index >= 0 && index < 9) {
            if (currentBoard[index] === null) {
                gameboard.placeMark(index, currentPlayer.symbol);

                gameboard.getBoard();
                // logic for win condition to be added
                if(checkWinner()){
                    console.log("we found the winner");
                    winnerFound = true;
                }
                else {
                    switchPlayer();
                }

               
            } else {
                console.log("Cell is occupied. Try again.");
            }
        } else {
            console.log("Invalid move.");
        }
    };
    return { 
        startGame,
        makeMove,
    }
})();

//player two wins 

// GameController.startGame();
// GameController.makeMove(0);
// GameController.makeMove(3);
// GameController.makeMove(2);
// GameController.makeMove(4);
// GameController.makeMove(3);
// GameController.makeMove(6);
// GameController.makeMove(1);
// GameController.makeMove(5);
// GameController.makeMove(7);
// GameController.makeMove(8);


//draw

// GameController.startGame();
// GameController.makeMove(0);
// GameController.makeMove(1);
// GameController.makeMove(2);
// GameController.makeMove(3);
// GameController.makeMove(5);
// GameController.makeMove(4);
// GameController.makeMove(6);
// GameController.makeMove(8);
// GameController.makeMove(7);



GameController.startGame();
GameController.makeMove(0);
GameController.makeMove(3);
GameController.makeMove(1);
GameController.makeMove(5);
GameController.makeMove(2);
GameController.makeMove(4);
