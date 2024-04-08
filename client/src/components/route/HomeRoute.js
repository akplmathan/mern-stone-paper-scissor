import React, { useEffect, useState } from "react";
import { FaHandRock } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaHandPeace } from "react-icons/fa";
import "./style.css";
import axios from "axios";

const HomeRoute = ({ player1, player2, setStart, setPlayer1, setPlayer2 }) => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [loading, setLoading] = useState(true);
  const Choice = ["stone", "paper", "scissor"];
  const [gameRound, setGameRound] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  let [winner, setWinner] = useState("");
  const [matchEnd, setMatchEnd] = useState(false);
  const [result, setResult] = useState("");
  const [gameRoundHistory, setGameRoundHistory] = useState([]);
  const [fullHistory, setFullHistory] = useState({});
  const [finalWinner, setFinalWinner] = useState("");
  let winnerInfo = "";

  const HandlePlayer1 = (number) => {
    setPlayer1Choice(Choice[number]);
  };
  const HandlePlayer2 = (number) => {
    setPlayer2Choice(Choice[number]);
  };
  setTimeout(() => {
    setLoading(false);
  }, 500);
  if (loading) {
    return (
      <div className="home">
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTY3ODd5anJuMjk4MzVnemhmamhmczNoYnpzYmtnenN2MmF6MDQyOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" />
      </div>
    );
  }

  const HandlePlay = async () => {
    if (player1Choice !== "" && player2Choice !== "") {
      if (player1Choice == player2Choice) {
        setWinner("tie");
        winnerInfo = "tie";
        setPlayer1Choice("");
        setPlayer2Choice("");
      } else if (
        (player1Choice === "scissor" && player2Choice === "paper") ||
        (player1Choice === "stone" && player2Choice === "scissor") ||
        (player1Choice === "paper" && player2Choice === "stone")
      ) {
        setWinner(player1);
        winnerInfo = player1;
        setPlayer1Score(player1Score + 1);
        setPlayer1Choice("");
        setPlayer2Choice("");
      } else {
        setWinner(player2);
        winnerInfo = player2;
        setPlayer2Score(player2Score + 1);
        setPlayer1Choice("");
        setPlayer2Choice("");
      }
      setGameRound(gameRound + 1);
    }
    
    if (player1Choice == player2Choice) {
      winnerInfo = "tie";
    } else if (
      (player1Choice === "scissor" && player2Choice === "paper") ||
      (player1Choice === "stone" && player2Choice === "scissor") ||
      (player1Choice === "paper" && player2Choice === "stone")
    ) {
      winnerInfo = player1;
    } else {
      winnerInfo = player2;
    }

    let Obj = {
      player1Choice,
      player2Choice,
      result: winnerInfo,
    };

    setGameRoundHistory([...gameRoundHistory, Obj]);
    if (gameRound == 6) {
      if (player1Score > player2Score) {
        setResult(`${player1} Won the Match`);
        setFinalWinner(player1);
      } else if (player1Score < player2Score) {
        setResult(`${player2} Won the Match`);
        setFinalWinner(player2);
      } else {
        setResult("Match Draw");
        setFinalWinner("Match Tie");
      }

      setMatchEnd(true);

      setGameRound(0);
    }
  };

  const postData = async () => {
    setFullHistory({
      player1,
      player2,
      rounds: gameRoundHistory,
      winner: winner,
    });
    const res = await axios.post("http://localhost:4000/api/", fullHistory);
    console.log(res);
    setStart(false);
  };

  return (
    <div className="home-route">
      <div className="con">
        <div className="container">
          <div className="details">
            <h4>Round : {gameRound}</h4>
            <div className="score">
              <h5>Scores</h5>
              <h6>
                {player1} : {player1Score}
              </h6>
              <h6>
                {player2} : {player2Score}
              </h6>
            </div>
          </div>
          <div className="main">
            <div className="opt-left">
              <button onClick={() => HandlePlayer1(0)}>
                <FaHandRock size={80} />
              </button>
              <button onClick={() => HandlePlayer1(1)}>
                <FaHandPaper size={80} />
              </button>
              <button onClick={() => HandlePlayer1(2)}>
                <FaHandPeace size={80} />
              </button>
            </div>
            <div className="result">
              {matchEnd ? <h2>{result}</h2> : <h2>Winner Is {winner}</h2>}
              <div className="player-choice">
                <div>
                  <div>
                    <h4>{player1}</h4>
                    <h3>{player1Choice}</h3>
                  </div>
                  <div>
                    <h4>{player2}</h4>
                    <h3>{player2Choice}</h3>
                  </div>
                </div>
                {matchEnd ? (
                  <button
                    onClick={() => {
                      postData();
                    }}
                  >
                    Save and Continue
                  </button>
                ) : (
                  <button onClick={HandlePlay}>Play</button>
                )}
              </div>
            </div>

            <div className="opt-right">
              <button onClick={() => HandlePlayer2(0)}>
                <FaHandRock size={80} />
              </button>
              <button onClick={() => HandlePlayer2(1)}>
                <FaHandPaper size={80} />
              </button>
              <button onClick={() => HandlePlayer2(2)}>
                <FaHandPeace size={80} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRoute;
