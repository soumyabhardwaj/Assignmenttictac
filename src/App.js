import "./App.css";
import { useEffect, useImperativeHandle, useState } from "react";

const App = () => {
  const [board, setBoard] = useState([
    { value: 0, player: null, index: 0 },
    { value: 0, player: null, index: 1 },
    { value: 0, player: null, index: 2 },
    { value: 0, player: null, index: 3 },
    { value: 0, player: null, index: 4 },
    { value: 0, player: null, index: 5 },
    { value: 0, player: null, index: 6 },
    { value: 0, player: null, index: 7 },
    { value: 0, player: null, index: 8 },
  ]);
  const [availableNumbers, setAvailableNumber] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [turns, setTurns] = useState(1);
  const [selected, setSelected] = useState();
  const [showWinner, setShowWinner] = useState({ win: false, winner: null });

  const handleSelected = (index) => {
    if (board[index].value === 0 && !showWinner.win) {
      setSelected(board[index]);
    }
    checkIfAnyoneHasWon();
  };

  const handleClickOfItems = (e, index) => {
    e.preventDefault();
    if (turns <= 9 && availableNumbers[index] !== null && !showWinner.win) {
      let tempboard = board;
      tempboard[selected.index] = {
        value: availableNumbers[index],
        player: isPlayerOne,
        index: selected.index,
      };
      setBoard(tempboard);
      let tempAvailable = availableNumbers;
      tempAvailable[index] = null;
      setAvailableNumber(tempAvailable);
      setTurns(turns + 1);
      setIsPlayerOne(!isPlayerOne);
      setSelected(null);
    }
    checkIfAnyoneHasWon();
  };

  const determineClass = (selectedIndex) => {
    //How the box should Look
    if (selected && selected.index === selectedIndex) {
      if (isPlayerOne) {
        return "gridItem selectedPlayerOne";
      } else {
        return "gridItem selectedPlayerTwo";
      }
    } else {
      if (board[selectedIndex].player !== null) {
        if (board[selectedIndex].player) {
          return "gridItem selectedPlayerOne finished";
        } else {
          return "gridItem selectedPlayerTwo finished";
        }
      } else {
        return "gridItem";
      }
    }
  };

  const checkPlayerTileWinCondition = (array, value) => {
    //check tiles of player matching win contions
    return array.some((item) => {
      return item.value === value;
    });
  };
  const winConditions = (playerOne, playerTwo, one, two, three) => {
    //Check for Win Condition
    if (one + two + three === 15) {
      if (
        checkPlayerTileWinCondition(playerOne, one) &&
        checkPlayerTileWinCondition(playerOne, two) &&
        checkPlayerTileWinCondition(playerOne, three)
      ) {
        setShowWinner({ win: true, winner: "Player One" });
      }
      if (
        checkPlayerTileWinCondition(playerTwo, one) &&
        checkPlayerTileWinCondition(playerTwo, two) &&
        checkPlayerTileWinCondition(playerTwo, three)
      ) {
        setShowWinner({ win: true, winner: "Player Two" });
      }
     
     
    } 
   
     
    
    
    
  };

  const checkIfAnyoneHasWon = () => {
    let playerOne = board.filter((item) => item.player);
    let playerTwo = board.filter((item) => item.player === false);
    //linear horizontal
    winConditions(
      playerOne,
      playerTwo,
      board[0].value,
      board[1].value,
      board[2].value
    );
    winConditions(
      playerOne,
      playerTwo,
      board[3].value,
      board[4].value,
      board[5].value
    );
    winConditions(
      playerOne,
      playerTwo,
      board[6].value,
      board[7].value,
      board[8].value
    );
    //linear vertical
    winConditions(
      playerOne,
      playerTwo,
      board[0].value,
      board[3].value,
      board[6].value
    );
    winConditions(
      playerOne,
      playerTwo,
      board[1].value,
      board[4].value,
      board[7].value
    );
    winConditions(
      playerOne,
      playerTwo,
      board[2].value,
      board[5].value,
      board[8].value
    );
    //diagonal
    winConditions(
      playerOne,
      playerTwo,
      board[0].value,
      board[4].value,
      board[8].value
    );
    winConditions(
      playerOne,
      playerTwo,
      board[2].value,
      board[4].value,
      board[6].value
    );
  };

  useEffect(() => {}, []);

  return (
    <div className="parentDiv">
      {showWinner.win ? (
        <h1>Winner Declared </h1>
      ) : isPlayerOne ? (
        <h1>Player One's Turn</h1>
      ) : (
        <h1>Player Two's Turn</h1>
      )}
      <h1>Board</h1>
      <div className="intialBoard">
        {board.map((item, index) => {
          return (
            <div
              className={determineClass(index)}
              onClick={() => {
                handleSelected(index);
              }}
            >
              {item.value !== 0 && item.value}
            </div>
          );
        })}
      </div>
      <h1>Available Numbers</h1>
      <div className="playerBoard">
        {availableNumbers.map((item, index) => {
          return (
            <div
              className="gridItem"
              onClick={(e) => {
                handleClickOfItems(e, index);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      {showWinner.win && <h1>{showWinner.winner} Has Won</h1>}
    </div>
  );
};

export default App;
