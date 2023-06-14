import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";
import { Patterns } from "../WinningPatterns";

function Board({ result, setResult }) {
  const [board, setBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [player, setPlayer] = useState("X");
  //state for who-should-be-playing-now
  const [turn, setTurn] = useState("X");
  //for channel sendEvent
  const { channel } = useChannelStateContext();
  //current user on channel which is you
  const { client } = useChatContext();

  //whenever there is a change in the board state,
  //check if someone won
  useEffect(() => {
    checkIfTie();
    checkWin();
  }, [board]);

  const chooseSquare = async (square) => {
    //check if square is empty
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");

      //sendEvent func in stream api allows to send data to a certain channel
      //so users on it can listen and receive data bidirectionally
      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });
      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      let foundWinningPattern = true;
      if (firstPlayer == "") return;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: board[currPattern[0]], state: "won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "none", state: "tie" });
    }
  };

  //the other person listens and moves
  channel.on((event) => {
    if (event.type == "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      //set the board to be equal to the new board w/ the game move implemented
      //by the person who sent this event
      setBoard(
        board.map((val, idx) => {
          if (idx === event.data.square && val === "") {
            //fill square in w/ whichever player made the move
            return event.data.player;
          }
          return val;
        })
      );
    }
  });

  return (
    <div className="board">
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(0);
          }}
          val={board[0]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(1);
          }}
          val={board[1]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(2);
          }}
          val={board[2]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(3);
          }}
          val={board[3]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(4);
          }}
          val={board[4]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(5);
          }}
          val={board[5]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(6);
          }}
          val={board[6]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(7);
          }}
          val={board[7]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(8);
          }}
          val={board[8]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(9);
          }}
          val={board[9]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(10);
          }}
          val={board[10]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(11);
          }}
          val={board[11]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(12);
          }}
          val={board[12]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(13);
          }}
          val={board[13]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(14);
          }}
          val={board[14]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(15);
          }}
          val={board[15]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(16);
          }}
          val={board[16]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(17);
          }}
          val={board[17]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(18);
          }}
          val={board[18]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(19);
          }}
          val={board[19]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(20);
          }}
          val={board[20]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(21);
          }}
          val={board[21]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(22);
          }}
          val={board[22]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(23);
          }}
          val={board[23]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(24);
          }}
          val={board[24]}
        />
      </div>
    </div>
  );
}

export default Board;
