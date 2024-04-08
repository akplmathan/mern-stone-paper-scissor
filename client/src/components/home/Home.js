import React, { useState } from "react";
import HomeRoute from "../route/HomeRoute";
import "./style.css";
import {Link} from 'react-router-dom'

const Home = () => {
  const [player1, setPlayer1] = useState("John");
  const [player2, setPlayer2] = useState("David");
  const [start, setStart] = useState(false);

  const HandleStart = () => {
    setStart(true);
  };
  if (!start) {
    return (
      <div className="home">
        <div className="con">
          <h2>Stone Paper Scissor</h2>
          <div className="inputs">
            <label htmlFor="">
              Player1 name:{" "}
              <input
                type="text"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value.toUpperCase())}
              />
            </label>
            <label htmlFor="">
              Player2 name:{" "}
              <input
                type="text"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value.toUpperCase())}
              />
            </label>
          </div>
          <div className="button">
          <button onClick={HandleStart}>Start Game</button>
          <button><Link to={'/history'}>View Game History</Link></button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {
          <HomeRoute
            player1={player1}
            player2={player2}
            setStart={setStart}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
          />
        }
      </div>
    );
  }
};

export default Home;
