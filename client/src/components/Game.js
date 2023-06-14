import React, { useState } from "react";
import Board from "./Board";
import "./Chat.css";
import { Window, MessageList, MessageInput } from "stream-chat-react";

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  //anytime there is a change to the watch account set playersJoined to true
  channel.on("user.watching.start", (event) => {
    setPlayersJoined(channel.state.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div> Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        Leave Game
      </button>
      {result.state === "won" && <div>{result.winner} Won The Game</div>}
      {result.state === "tie" && <div>Game Tied</div>}
    </div>
  );
}

export default Game;
